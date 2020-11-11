type ImpactedApplication =
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

type TargetApplication = "ALL";
type RequiredParams = "kintoneAppId";

type ManifestJson = {
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
    js?: string[];
    css?: string[];
  };
  config?: {
    html: string;
    js?: string[];
    css?: string[];
    required_params?: RequiredParams[];
  };
};
