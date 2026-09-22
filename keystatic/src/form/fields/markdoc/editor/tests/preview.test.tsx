import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KeystarProvider } from '@keystar/ui/core';
import { describe, expect, it } from 'vitest';
import {
  MarkdocPreviewPanel,
  MarkdocPreviewProvider,
  PreviewEntryButton,
  PreviewToolbar,
} from '../preview';

function PreviewHarness() {
  return (
    <KeystarProvider>
      <MarkdocPreviewProvider previewUrl="/preview/article">
        <PreviewEntryButton />
        <PreviewToolbar />
        <MarkdocPreviewPanel />
      </MarkdocPreviewProvider>
    </KeystarProvider>
  );
}

describe('Markdoc site preview', () => {
  it('enters preview with the three viewport controls', async () => {
    const user = userEvent.setup();
    render(<PreviewHarness />);

    const previewButton = screen.getByRole('button', { name: 'Preview' });
    expect(previewButton).not.toHaveTextContent('Preview');
    await user.click(previewButton);

    expect(screen.queryByRole('button', { name: 'Preview' })).toBeNull();
    expect(
      screen.getByRole('button', { name: 'Back to editing' })
    ).toBeVisible();
    expect(screen.getAllByRole('button')).toHaveLength(4);
    expect(screen.getByTitle('Site preview')).toHaveAttribute(
      'src',
      '/preview/article'
    );
  });

  it('changes viewport without changing the preview URL', async () => {
    const user = userEvent.setup();
    render(<PreviewHarness />);
    await user.click(screen.getByRole('button', { name: 'Preview' }));

    const frame = screen.getByTitle('Site preview');
    await user.click(
      screen.getByRole('button', { name: 'Tablet, 768 by 1024 pixels' })
    );

    expect(frame).toHaveAttribute('src', '/preview/article');
    expect(frame).toHaveStyle({ width: '768px', height: '1024px' });
    expect(
      screen.getByRole('button', { name: 'Tablet, 768 by 1024 pixels' })
    ).toHaveAttribute('aria-pressed', 'true');
  });
});
