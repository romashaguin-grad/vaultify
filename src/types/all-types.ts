type File = {
  name: string;
  url: string;
  thumbnail: string;
  mime: string;
  updatedAt: Date;
  createdAt: Date;
  size: number;
  filePath: string;
  fileId: string;
};

type DeleteFileType = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fileId: string;
  fileUrl: string;
  onSuccess?: () => void;
};

type FileDetailsType = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  file: any;
  onSuccess?: () => void;
};

type FilePreviewType = {
  file: File;
  isVideo: boolean;
  isImage: boolean;
  thumbnail: string;
  transformQuery: string;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

type FolderCardType = {
  folderPath: string;
  name: string;
};

type ImgPreviewSidebarType = {
  file: File;
  selectedTransforms: string[];
  prompts: { [key: string]: string };
  handleToggle: (id: string, promtText?: string) => void;
  handlePromptChange: (id: string, value: string) => void;
};

type PromptEditorType = {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onApply: () => void;
};

export type {
  File,
  DeleteFileType,
  FileDetailsType,
  FilePreviewType,
  FolderCardType,
  ImgPreviewSidebarType,
  PromptEditorType,
};
