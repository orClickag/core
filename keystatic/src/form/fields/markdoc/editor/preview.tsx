import { ActionButton } from '@keystar/ui/button';
import { Icon } from '@keystar/ui/icon';
import { arrowLeftIcon } from '@keystar/ui/icon/icons/arrowLeftIcon';
import { monitorIcon } from '@keystar/ui/icon/icons/monitorIcon';
import { smartphoneIcon } from '@keystar/ui/icon/icons/smartphoneIcon';
import { tabletIcon } from '@keystar/ui/icon/icons/tabletIcon';
import { viewIcon } from '@keystar/ui/icon/icons/viewIcon';
import { css, tokenSchema } from '@keystar/ui/style';
import { ProgressCircle } from '@keystar/ui/progress';
import { Tooltip, TooltipTrigger } from '@keystar/ui/tooltip';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

export type PreviewViewport = 'desktop' | 'tablet' | 'mobile';

const viewports: Record<
  PreviewViewport,
  { label: string; width: number; height: number; icon: ReactNode }
> = {
  desktop: { label: 'Desktop', width: 1440, height: 900, icon: monitorIcon },
  tablet: { label: 'Tablet', width: 768, height: 1024, icon: tabletIcon },
  mobile: { label: 'Mobile', width: 390, height: 844, icon: smartphoneIcon },
};

type PreviewContextValue = {
  isPreview: boolean;
  previewUrl?: string;
  viewport: PreviewViewport;
  enterPreview(): void;
  exitPreview(): void;
  setViewport(viewport: PreviewViewport): void;
};

const PreviewContext = createContext<PreviewContextValue | null>(null);

export function useMarkdocPreview() {
  return useContext(PreviewContext);
}

export function MarkdocPreviewProvider(props: {
  previewUrl?: string;
  children: ReactNode;
}) {
  const [isPreview, setIsPreview] = useState(false);
  const [viewport, setViewport] = useState<PreviewViewport>('desktop');
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const value = {
    isPreview,
    previewUrl: props.previewUrl,
    viewport,
    enterPreview() {
      returnFocusRef.current = document.activeElement as HTMLElement;
      setIsPreview(true);
    },
    exitPreview() {
      setIsPreview(false);
      requestAnimationFrame(() => {
        const editor = document.querySelector<HTMLElement>(
          '[data-keystatic-editor="content"] [contenteditable="true"]'
        );
        (editor ?? returnFocusRef.current)?.focus();
      });
    },
    setViewport,
  } satisfies PreviewContextValue;
  return (
    <PreviewContext.Provider value={value}>
      {props.children}
    </PreviewContext.Provider>
  );
}

export function PreviewToolbar() {
  const preview = useMarkdocPreview()!;
  const backRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (preview.isPreview) backRef.current?.focus();
  }, [preview.isPreview]);
  return (
    <div
      className={css({
        display: 'flex',
        gap: tokenSchema.size.space.small,
        alignItems: 'center',
      })}
    >
      <ActionButton
        ref={backRef}
        aria-label="Back to editing"
        onPress={preview.exitPreview}
      >
        <Icon src={arrowLeftIcon} />
      </ActionButton>
      {(['desktop', 'tablet', 'mobile'] as PreviewViewport[]).map(key => {
        const preset = viewports[key];
        return (
          <ActionButton
            key={key}
            aria-label={`${preset.label}, ${preset.width} by ${preset.height} pixels`}
            aria-pressed={preview.viewport === key}
            onPress={() => preview.setViewport(key)}
          >
            <Icon src={preset.icon} />
          </ActionButton>
        );
      })}
    </div>
  );
}

export function PreviewEntryButton() {
  const preview = useMarkdocPreview();
  if (!preview?.previewUrl || preview.isPreview) return null;
  return (
    <TooltipTrigger>
      <ActionButton
        prominence="low"
        aria-label="Preview"
        onPress={preview.enterPreview}
      >
        <Icon src={viewIcon} />
      </ActionButton>
      <Tooltip>Preview</Tooltip>
    </TooltipTrigger>
  );
}

export function MarkdocPreviewPanel() {
  const preview = useMarkdocPreview()!;
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(
    'loading'
  );
  const preset = viewports[preview.viewport];
  if (!preview.isPreview) return null;
  return (
    <div
      className={css({
        alignItems: 'center',
        backgroundColor: tokenSchema.color.background.canvas,
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        minHeight: 0,
        overflow: 'auto',
      })}
    >
      <div
        className={css({
          position: 'relative',
          flexShrink: 0,
          padding: tokenSchema.size.space.large,
        })}
      >
        {status === 'loading' && (
          <ProgressCircle aria-label="Loading preview" isIndeterminate />
        )}
        {status === 'error' && (
          <div role="alert">
            Unable to embed the preview. The site may block embedding.
            <br />
            <ActionButton onPress={() => setStatus('loading')}>
              Try again
            </ActionButton>{' '}
            <ActionButton
              href={preview.previewUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open preview in a new tab
            </ActionButton>
          </div>
        )}
        <iframe
          title="Site preview"
          src={preview.previewUrl}
          onLoad={() => setStatus('ready')}
          onError={() => setStatus('error')}
          style={{
            width: preset.width,
            height: preset.height,
            display: status === 'error' ? 'none' : 'block',
            border: 0,
          }}
        />
      </div>
    </div>
  );
}
