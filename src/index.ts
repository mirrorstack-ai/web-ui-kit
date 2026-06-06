// Public API barrel for @mirrorstack-ai/web-ui-kit.
// Grouped by category to mirror the on-disk taxonomy (src/components/ui/<category>).
// Consumers import everything from the package root — internal file moves never
// change these names.

// --- utils ---
export { cn } from "./utils/cn";
export { formatDate, formatRelativeDate } from "./utils/date";
export { isDev, isProd, isStorybook } from "./utils/env";

// --- design tokens ---
export { type Tone, toneBorderClass, toneTextClass } from "./types/tone";

// --- ui/actions ---
export {
  Button,
  type ButtonProps,
  type ButtonVariant,
  type ButtonColor,
  type ButtonSize,
} from "./components/ui/actions/button/Button";
export {
  IconButton,
  type IconButtonProps,
} from "./components/ui/actions/icon-button/IconButton";
export {
  ThemeToggle,
  type ThemeToggleProps,
  type Theme,
} from "./components/ui/actions/theme-toggle/ThemeToggle";
export {
  SocialButton,
  SocialIcon,
  type SocialButtonProps,
  type SocialIconProps,
  type SocialProvider,
} from "./components/ui/actions/social-button/SocialButton";

// --- ui/agent ---
export {
  AgentSidebarHeader,
  type AgentSidebarHeaderProps,
} from "./components/ui/agent/sidebar/AgentSidebarHeader";
export {
  AgentSidebarInput,
  type AgentSidebarInputProps,
} from "./components/ui/agent/sidebar/AgentSidebarInput";
export {
  AgentGreeting,
  type AgentGreetingProps,
  type AgentGreetingModel,
} from "./components/ui/agent/greeting/AgentGreeting";
export {
  AgentSidebarUserMessage,
  type AgentSidebarUserMessageProps,
  AgentSidebarAgentMessage,
  type AgentSidebarAgentMessageProps,
} from "./components/ui/agent/messages/AgentSidebarMessage";
export {
  AgentSidebarMultiQuestion,
  type AgentSidebarMultiQuestionProps,
  type AgentSidebarQuestion,
  type AgentSidebarMultiQuestionStatus,
  type AgentSidebarMultiQuestionAnswer,
  type AgentSidebarMultiQuestionLayout,
  type AgentSidebarChoiceStyle,
} from "./components/ui/agent/asks/AgentSidebarMultiQuestion";
export {
  AgentSidebarMessages,
  type AgentSidebarMessage,
  type AgentSidebarMessagesProps,
} from "./components/ui/agent/messages/AgentSidebarMessages";
export {
  type AgentSidebarHistoryGroup,
  type AgentSidebarHistoryItem,
} from "./components/ui/agent/sidebar/types";

// --- ui/blocks (NotchGrid tile primitives) ---
export {
  MetricBlock,
  type MetricBlockProps,
  type MetricBlockTone,
  type MetricBlockLayout,
  type MetricTrend,
  type MetricStat,
} from "./components/ui/blocks/metric-block/MetricBlock";
export {
  Sparkline,
  type SparklineProps,
  type SparklinePoint,
} from "./components/ui/blocks/sparkline/Sparkline";
export {
  DataList,
  type DataListProps,
  type DataListItem,
} from "./components/ui/blocks/data-list/DataList";
export {
  DataTable,
  type DataTableProps,
  type DataTableColumn,
} from "./components/ui/blocks/data-table/DataTable";
export {
  StatusIndicator,
  type StatusIndicatorProps,
  type StatusLevel,
} from "./components/ui/blocks/status-indicator/StatusIndicator";
export {
  StarRating,
  type StarRatingProps,
} from "./components/ui/blocks/star-rating/StarRating";
export {
  Timeline,
  type TimelineProps,
  type TimelineEntry,
} from "./components/ui/blocks/timeline/Timeline";
export {
  Gauge,
  type GaugeProps,
} from "./components/ui/blocks/gauge/Gauge";

// --- ui/dev ---
export {
  DevToolbar,
  type DevToolbarProps,
  type DevToolbarItem,
} from "./components/ui/dev/dev-toolbar/DevToolbar";

// --- ui/display ---
export {
  PageHeader,
  type PageHeaderProps,
} from "./components/ui/display/page-header/PageHeader";
export {
  SectionHeader,
  type SectionHeaderProps,
} from "./components/ui/display/section-header/SectionHeader";
export {
  SectionLabel,
  type SectionLabelProps,
} from "./components/ui/display/section-label/SectionLabel";
export {
  ReadOnlyField,
  type ReadOnlyFieldProps,
  type ReadOnlyFieldLayout,
} from "./components/ui/display/read-only-field/ReadOnlyField";
export {
  Step,
  type StepProps,
  type StepStatus,
} from "./components/ui/display/step/Step";
export {
  Markdown,
  type MarkdownProps,
} from "./components/ui/display/markdown/Markdown";
export {
  SettingRow,
  type SettingRowProps,
} from "./components/ui/display/setting-row/SettingRow";
export {
  ActivityList,
  type ActivityListProps,
  type ActivityItem,
} from "./components/ui/display/activity-list/ActivityList";

// --- ui/feedback ---
export {
  Progress,
  type ProgressProps,
  type ProgressType,
  type ProgressColor,
  type ProgressVariant,
  type ProgressSize,
} from "./components/ui/feedback/progress/Progress";
export {
  Snackbar,
  SNACKBAR_EXIT_MS,
  type SnackbarProps,
  type SnackbarVariant,
  type SnackbarAction,
} from "./components/ui/feedback/snackbar/Snackbar";
export {
  Alert,
  type AlertProps,
  type AlertVariant,
} from "./components/ui/feedback/alert/Alert";
export {
  ConsequencesNotice,
  type ConsequencesNoticeProps,
} from "./components/ui/feedback/consequences-notice/ConsequencesNotice";
export {
  Badge,
  type BadgeProps,
  type BadgeVariant,
  type BadgeSize,
} from "./components/ui/feedback/badge/Badge";
export {
  Skeleton,
  type SkeletonProps,
} from "./components/ui/feedback/skeleton/Skeleton";
export {
  EmptyState,
  type EmptyStateProps,
} from "./components/ui/feedback/empty-state/EmptyState";

// --- ui/graph ---
export {
  GraphAction,
  type GraphActionProps,
} from "./components/ui/graph/action/GraphAction";
export {
  GraphSide,
  type GraphSideProps,
  type GraphSideNode,
} from "./components/ui/graph/graph-side/GraphSide";
export {
  GraphSideHeader,
  type GraphSideHeaderProps,
} from "./components/ui/graph/graph-side/GraphSideHeader";
export {
  GraphSideContent,
  type GraphSideContentProps,
  type GraphSideContentItem,
} from "./components/ui/graph/graph-side/GraphSideContent";
export {
  GraphSideSetting,
  type GraphSideSettingProps,
  type GraphSideSettingValue,
} from "./components/ui/graph/graph-side/GraphSideSetting";
export {
  GraphSideGroup,
  DEFAULT_GROUP_PALETTE,
  type GraphSideGroupProps,
  type GraphSideGroupItem,
} from "./components/ui/graph/graph-side/GraphSideGroup";
export {
  GraphSideSearch,
  type GraphSideSearchProps,
} from "./components/ui/graph/graph-side/GraphSideSearch";
export {
  GraphSideNodeSummary,
  type GraphSideNodeSummaryProps,
} from "./components/ui/graph/graph-side/GraphSideNodeSummary";
export {
  GraphSideNodeDetail,
  type GraphSideNodeDetailProps,
} from "./components/ui/graph/graph-side/GraphSideNodeDetail";
export {
  GraphSideNodeReferences,
  type GraphSideNodeReferencesProps,
  type GraphSideNodeReference,
} from "./components/ui/graph/graph-side/GraphSideNodeReferences";
export {
  Graph,
  type GraphProps,
  type GraphNode,
  type GraphEdge,
  type GraphHandle,
} from "./components/ui/graph/graph/Graph";

// --- ui/inputs ---
export {
  FloatingLabelInput,
  type FloatingLabelInputProps,
  type FloatingLabelInputSize,
} from "./components/ui/inputs/floating-label-input/FloatingLabelInput";
export {
  SegmentedButton,
  type SegmentedButtonProps,
  type SegmentedButtonOption,
  type SegmentedButtonSize,
  type SegmentedButtonOptionTone,
} from "./components/ui/inputs/segmented-button/SegmentedButton";
export {
  Switch,
  type SwitchProps,
  type SwitchColor,
  type SwitchSize,
} from "./components/ui/inputs/switch/Switch";
export {
  Slider,
  type SliderProps,
} from "./components/ui/inputs/slider/Slider";
export {
  EditableField,
  type EditableFieldProps,
} from "./components/ui/inputs/editable-field/EditableField";
export { useEditableFields } from "./components/ui/inputs/editable-field/use-editable-fields";
export {
  Combobox,
  type ComboboxProps,
  type ComboboxOption,
  type ComboboxSize,
} from "./components/ui/inputs/combobox/Combobox";
export {
  VerificationCodeInput,
  type VerificationCodeInputProps,
} from "./components/ui/inputs/verification-code-input/VerificationCodeInput";
export {
  DropZone,
  type DropZoneProps,
} from "./components/ui/inputs/drop-zone/DropZone";

// --- ui/media ---
export { Icon, type IconProps } from "./components/ui/media/icon/Icon";
export {
  Avatar,
  type AvatarProps,
  type AvatarSize,
} from "./components/ui/media/avatar/Avatar";
export {
  AvatarCropper,
  type AvatarCropperProps,
} from "./components/ui/media/avatar-cropper/AvatarCropper";
export { Logo, type LogoProps } from "./components/ui/media/logo/Logo";
export {
  ImageCarousel,
  type ImageCarouselProps,
  type CarouselImage,
} from "./components/ui/media/image-carousel/ImageCarousel";

// --- ui/navigation ---
export {
  Breadcrumb,
  type BreadcrumbItem,
  type BreadcrumbProps,
} from "./components/ui/navigation/breadcrumb/Breadcrumb";
export {
  NavItem,
  type NavItemProps,
  type NavItemVariant,
} from "./components/ui/navigation/nav-item/NavItem";
export {
  NavDrawer,
  type NavDrawerProps,
  type NavDrawerItem,
  type NavDrawerSection,
} from "./components/ui/navigation/nav-drawer/NavDrawer";
export {
  NavigationRail,
  type NavigationRailProps,
} from "./components/ui/navigation/navigation-rail/NavigationRail";
export {
  NavigationButton,
  type NavigationButtonProps,
  type NavigationButtonVariant,
} from "./components/ui/navigation/navigation-button/NavigationButton";
export {
  AppSwitcher,
  type AppSwitcherProps,
  type AppLink,
} from "./components/ui/navigation/app-switcher/AppSwitcher";
export {
  DropdownMenu,
  type DropdownMenuProps,
  type DropdownMenuItem,
  type DropdownMenuEntry,
  type DropdownMenuSeparator,
} from "./components/ui/navigation/dropdown-menu/DropdownMenu";

// --- ui/surfaces ---
export {
  Dialog,
  type DialogProps,
  type DialogAction,
} from "./components/ui/surfaces/dialog/Dialog";
export {
  TypeToConfirmDialog,
  type TypeToConfirmDialogProps,
} from "./components/ui/surfaces/type-to-confirm-dialog/TypeToConfirmDialog";
export {
  ReauthDialog,
  type ReauthDialogProps,
} from "./components/ui/surfaces/reauth-dialog/ReauthDialog";
export {
  Surface,
  type SurfaceProps,
} from "./components/ui/surfaces/surface/Surface";
export {
  SettingsSection,
  type SettingsSectionProps,
} from "./components/ui/surfaces/settings-section/SettingsSection";
export {
  Card,
  type CardProps,
} from "./components/ui/surfaces/card/Card";
export {
  OptionList,
  type OptionListProps,
  type OptionListItem,
} from "./components/ui/surfaces/option-list/OptionList";
export {
  Notch,
  type NotchProps,
  type NotchSide,
} from "./components/ui/surfaces/notch/Notch";
export {
  NotchGrid,
  type NotchGridProps,
  type NotchGridItem,
  type NotchSubItem,
  type NotchGridUI,
  type NotchGridError,
  type PrimitiveRegistry,
  type ItemKey,
} from "./components/ui/surfaces/notch-grid/NotchGrid";
export {
  type Desire,
  type Pos,
  type Mask,
  type Priority,
} from "./components/ui/surfaces/notch-grid/layout";
export {
  type NotchTheme,
  type ThemeType,
  type ThemeVariant,
} from "./components/ui/surfaces/notch-grid/theme";

// --- layout ---
export {
  AppShell,
  type AppShellProps,
} from "./components/layout/app-shell/AppShell";
export {
  GraphLayout,
  type GraphLayoutProps,
} from "./components/layout/graph-layout/GraphLayout";

// --- registry ---
export { defaultPrimitives } from "./components/registry/notch-primitives";

// --- context ---
export {
  ThemeProvider,
  useTheme,
  type ThemeProviderProps,
  type ThemeContextType,
} from "./context/theme/ThemeProvider";
export {
  SidebarProvider,
  useSidebarWidth,
  type SidebarProviderProps,
  type SidebarContextType,
} from "./context/sidebar/SidebarProvider";
export {
  SnackbarProvider,
  SnackbarOutlet,
  useSnackbar,
  useUnsavedSnackbar,
  type SnackbarProviderProps,
  type SnackbarOptions,
  type SnackbarOutletProps,
  type UseUnsavedSnackbarOptions,
} from "./context/snackbar/SnackbarProvider";
