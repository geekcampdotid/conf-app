// @flow

export type Presenter = {
  id: string;
  name: string;
  jobTitle: string;
  companyName: string;
  profilePictureUri?: string;
  companyLogoUri?: string;
  description?: string;
  email: string;
};

export type PresenterState = Map<string, Presenter>;

// TODO: add bio for more details?
