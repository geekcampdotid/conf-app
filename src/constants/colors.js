// @flow

export const baseColors = {
  MAIN_BLUE: '#00B0FF',
  LIGHT_BLUE: '#26ABEF',
  MAIN_RED: '#EC2B46',
  MAIN_YELLOW: '#FDB424',
  MAIN_GREEN: '#47C256',
  LIGHT_GREY: '#D7D7D7',
  DARK_GREY: '#444',
  GREY: '#666666',
  SHADOW_GREY: '#999',
  WHITE: '#FFFFFF',
  TRANSPARENT: '#0000',
  DARK_DIM: '#2221',
  DEFAULT_GRADIENT: [
    'transparent',
    'transparent',
    'transparent',
    'rgba(0, 0, 0, 0.4)',
    'rgba(0, 0, 0, 0.6)',
    'rgba(0, 0, 0, 0.8)',
  ],
};

export const themeColors = {
  THEME_COLOR: baseColors.MAIN_RED,
  STAGE_A_COLOR: baseColors.MAIN_RED,
  STAGE_B_COLOR: baseColors.MAIN_YELLOW,
  STAGE_C_COLOR: baseColors.MAIN_GREEN,
  TEXT_COLOR: baseColors.GREY,
  TITLE_TEXT_COLOR: baseColors.LIGHT_GREY,
  SCENE_DEFAULT: '#FFFFFF',
  ACTIVE_ICON_COLOR: baseColors.MAIN_RED,
  INACTIVE_ICON_COLOR: baseColors.GREY,
  NAVBAR_BACKGROUND_COLOR: baseColors.WHITE,
  HEADER_BACKGROUND_COLOR: baseColors.WHITE,
  DEFAULT_STAGE_COLOR: {
    THE_HALL: baseColors.MAIN_RED,
    SCTV_STUDIO: baseColors.MAIN_BLUE,
  },
  STATUS_BAR_COLOR: '#EEEEEE',
  BOOKMARK_COLOR: baseColors.MAIN_RED,
  UNBOOKMARK_COLOR: baseColors.GREY,
};

// TODO: REMOVE THIS ASAPPPP
export const MAIN_BLUE = '#00B0FF';
export const LIGHT_BLUE = '#26ABEF';
export const MAIN_RED = '#EC2B46';
export const MAIN_YELLOW = '#FDB424';
export const MAIN_GREEN = '#47C256';
export const LIGHT_GREY = '#D7D7D7';
export const DARK_GREY = '#444';
export const GREY = '#666666';
export const SHADOW_GREY = '#999';
export const WHITE = '#FFFFFF';
export const TRANSPARENT = '#0000';
export const DARK_DIM = '#2221';
export const DEFAULT_GRADIENT = [
  'transparent',
  'transparent',
  'transparent',
  'rgba(0, 0, 0, 0.4)',
  'rgba(0, 0, 0, 0.6)',
  'rgba(0, 0, 0, 0.8)',
];

export const THEME_COLOR = MAIN_RED;
export const STAGE_A_COLOR = MAIN_RED;
export const STAGE_B_COLOR = MAIN_YELLOW;
export const STAGE_C_COLOR = MAIN_GREEN;
export const TEXT_COLOR = GREY;
export const TITLE_TEXT_COLOR = LIGHT_GREY;
export const SCENE_DEFAULT = '#FFFFFF';

// Navbar
export const ACTIVE_ICON_COLOR = THEME_COLOR;
export const INACTIVE_ICON_COLOR = GREY;
export const NAVBAR_BACKGROUND_COLOR = WHITE;
export const HEADER_BACKGROUND_COLOR = WHITE;

export const DEFAULT_STAGE_COLOR = {
  'The Hall': MAIN_RED,
  'SCTV Studio': MAIN_BLUE,
};

export const STATUS_BAR_COLOR = '#EEEEEE';
