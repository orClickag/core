import { ReactNode, useContext } from "react";

import { alertCircleIcon } from "@keystar/ui/icon/icons/alertCircleIcon";

import { Config } from "../../config";

import { isGitHubConfig, isLocalConfig } from "../utils";

import { AppStateContext, ConfigContext } from "./context";
import {
  GitHubAppShellProvider,
  AppShellErrorContext,
  LocalAppShellProvider,
  useBranches,
  useCurrentBranch,
  GitHubAppShellDataContext,
  useRawCloudInfo,
} from "./data";
import { SidebarProvider } from "./sidebar";
import { MainPanelLayout } from "./panels";
import { EmptyState } from "./empty-state";

function CloudProvisioningState(props: { config: Config }) {
  const cloudInfo = useRawCloudInfo();
  const isAdmin =
    cloudInfo !== null &&
    cloudInfo !== "unauthorized" &&
    cloudInfo.role === "admin" &&
    cloudInfo.capabilities.provisioning;
  const setupUrl =
    cloudInfo && cloudInfo !== "unauthorized"
      ? new URL(
          `/projects/${encodeURIComponent(cloudInfo.project.id)}`,
          props.config.cloud?.url ?? window.location.origin,
        ).toString()
      : null;

  return (
    <EmptyState
      icon={alertCircleIcon}
      title="Projeto Cloud ainda não está configurado"
      message={
        isAdmin
          ? "Um administrador precisa vincular uma instalação GitHub, repositório e branch antes de abrir o editor."
          : "O projeto ainda não está disponível. Peça a um administrador para concluir a configuração no Cloud."
      }
      actions={
        isAdmin && setupUrl ? (
          <a href={setupUrl}>Configurar projeto no Cloud</a>
        ) : undefined
      }
    />
  );
}

function getCloudErrorCode(error: any) {
  const code = error?.graphQLErrors?.find(
    (graphQLError: any) => typeof graphQLError?.extensions?.code === "string",
  )?.extensions?.code;
  return typeof code === "string" ? code : null;
}

function BranchNotFound(props: { children: ReactNode }) {
  const branches = useBranches();
  const currentBranch = useCurrentBranch();
  const appShellDataContext = useContext(GitHubAppShellDataContext);
  if (
    appShellDataContext?.data?.repository?.refs?.pageInfo.hasNextPage ===
      false &&
    !branches.has(currentBranch)
  ) {
    return (
      <EmptyState
        icon={alertCircleIcon}
        title="Branch not found"
        message={`The branch ${currentBranch} does not exist in this repository.`}
      />
    );
  }
  return props.children;
}

export const AppShell = (props: {
  config: Config;
  children: ReactNode;
  currentBranch: string;
  basePath: string;
}) => {
  const content = (
    <AppShellErrorContext.Consumer>
      {(error) =>
        error ? (
          getCloudErrorCode(error) === "CLOUD_GITHUB_REPOSITORY_REQUIRED" &&
          props.config.storage.kind === "cloud" ? (
            <CloudProvisioningState config={props.config} />
          ) : !error?.graphQLErrors.some(
              (err) => (err?.originalError as any)?.type === "NOT_FOUND",
            ) ? (
            <EmptyState
              icon={alertCircleIcon}
              title="Failed to load shell"
              message={error.message}
            />
          ) : (
            props.children
          )
        ) : (
          props.children
        )
      }
    </AppShellErrorContext.Consumer>
  );

  const inner = (
    <ConfigContext.Provider value={props.config}>
      <AppStateContext.Provider value={{ basePath: props.basePath }}>
        <SidebarProvider>
          <MainPanelLayout>
            <BranchNotFound>{content}</BranchNotFound>
          </MainPanelLayout>
        </SidebarProvider>
      </AppStateContext.Provider>
    </ConfigContext.Provider>
  );

  if (isGitHubConfig(props.config) || props.config.storage.kind === "cloud") {
    return (
      <GitHubAppShellProvider
        currentBranch={props.currentBranch}
        config={props.config}
      >
        {inner}
      </GitHubAppShellProvider>
    );
  }
  if (isLocalConfig(props.config)) {
    return (
      <LocalAppShellProvider config={props.config}>
        {inner}
      </LocalAppShellProvider>
    );
  }
  return null;
};
