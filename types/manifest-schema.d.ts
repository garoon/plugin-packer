export type Resources = string[];

export type ImpactedApplication =
  | "ALL"
  | "PORTAL"
  | "SPACE"
  | "BOOKMARKS"
  | "SCHEDULER"
  | "MESSAGES"
  | "BULLETIN_BOARD"
  | "CABINET"
  | "MEMO"
  | "PHONE_MESSAGES"
  | "TIMESHEET"
  | "ADDRESS_BOOK"
  | "EMAIL"
  | "WORKFLOW"
  | "MULTI_REPORT"
  | "PRESENCE_INDICATORS"
  | "FAVORITE"
  | "NOTIFICATIONS"
  | "RESPOND";

export type TargetApplication = "ALL";
export type RequiredParams = "kintoneAppId";

export interface GaroonPluginManifestJson {
  manifest_version: number;
  version: string;
  target_applications: TargetApplication[];
  impacted_applications: ImpactedApplication[];
  name: {
    ja?: string;
    en: string;
    zh?: string;
    "zh-tw"?: string;
  };
  description?: {
    ja?: string;
    en: string;
    zh?: string;
    "zh-tw"?: string;
  };
  icon: string;
  homepage_url?: {
    ja?: string;
    en?: string;
    zh?: string;
    "zh-tw"?: string;
  };
  desktop?: {
    js?: Resources;
    css?: Resources;
  };
  config?: {
    html: string;
    js?: Resources;
    css?: Resources;
    required_params?: RequiredParams[];
  };
}
