import { EditorSettings } from '@/types/common';

const getDefaultEditorSettings = <T>(): EditorSettings<T> => ({
  open: false,
  mode: 'create',
  target: null,
});

export default getDefaultEditorSettings;
