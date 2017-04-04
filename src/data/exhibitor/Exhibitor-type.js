// @flow

export type Exhibitor = {
  id: string;
  avatarPictureUri: string;
  name: string;
  description?: string;
};

export type ExhibitorState = Map<string, Exhibitor>;
