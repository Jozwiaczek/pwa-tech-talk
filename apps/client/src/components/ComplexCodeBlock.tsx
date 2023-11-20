import { CodeBlock, dracula } from 'react-code-blocks';
import React from 'react';
import { CodeBlockLanguage } from '@/client/data/code-block-languages';
import { twMerge } from 'tailwind-merge';
import { Chip } from '@nextui-org/react';
import { Button } from '@/client/components/Button';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { useCopyToClipboard } from 'react-use';
import { toast } from 'react-toastify';

interface ComplexCodeBlockProps {
  code: string;
  language: CodeBlockLanguage;
  className?: string;
  filePath?: string;
}

export const ComplexCodeBlock = ({
  code,
  language,
  className,
  filePath,
}: ComplexCodeBlockProps) => {
  const [, copyToClipboard] = useCopyToClipboard();

  const handleCopyCode = () => {
    copyToClipboard(code);
    toast.success('Code copied to clipboard', {
      icon: <ClipboardDocumentIcon className="size-8 text-success" />,
    });
  };

  return (
    <div className={twMerge('relative w-full text-left', className)}>
      <div className="border-content1 flex h-12 w-full items-center justify-between rounded-t-lg border-b-2 bg-[#282a36] px-3">
        {filePath && <code className="text-default-500 text-xs">{filePath}</code>}
        <span />
        <Chip>{language}</Chip>
      </div>
      <div className="absolute right-0 top-12 pt-3 pr-3">
        <Button isIconOnly size="sm" variant="light" onPress={handleCopyCode}>
          <ClipboardDocumentIcon className="size-5" />
        </Button>
      </div>
      <CodeBlock
        text={code}
        language={language}
        theme={dracula}
        wrapLongLines
        showLineNumbers={false}
        customStyle={{
          borderRadius: '0 0 0.5rem 0.5rem',
        }}
      />
    </div>
  );
};
