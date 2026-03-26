// Utilities
export { cn } from "./utils/cn";
export { formatBytes } from "./utils/formatBytes";
export { formatDate } from "./utils/formatDate";

// Context / Providers
export { ThemeProvider, useTheme, type Theme } from "./context/ThemeContext";
export { SidebarProvider, useSidebarWidth } from "./context/SidebarContext";
export {
  SnackbarProvider,
  useSnackbar,
  useUnsavedSnackbar,
  SnackbarOutlet,
  type SnackbarOptions,
  type UseUnsavedSnackbarOptions,
} from "./context/SnackbarContext";

// Components — Layout
export { AppShell, type AppShellProps } from "./components/AppShell";
export { AppSwitcher, type AppSwitcherProps, type AppLink } from "./components/AppSwitcher";
export {
  AuthLayout,
  type AuthNavItem,
  type AuthNavSection,
} from "./components/AuthLayout";
export {
  NavDrawer,
  type NavDrawerProps,
  type NavDrawerItem,
  type NavDrawerSection,
} from "./components/NavDrawer";
export { AgentLayout } from "./components/AgentLayout";

// Components — Navigation
export { NavigationRail, type NavigationRailProps } from "./components/NavigationRail";
export { NavigationRailMenu, type NavigationRailMenuProps } from "./components/NavigationRailMenu";
export { NavigationButton, type NavigationButtonProps } from "./components/NavigationButton";
export { NavItem, type NavItemProps } from "./components/NavItem";
export { MobileNavItem, type MobileNavItemProps } from "./components/MobileNavItem";

// Components — Actions
export { Button, type ButtonProps } from "./components/Button";
export { IconButton, type IconButtonProps } from "./components/IconButton";
export { SocialButton, SocialIcon, type SocialButtonProps, type SocialIconProps, type SocialProvider } from "./components/SocialButton";
export { ThemeToggle, type ThemeToggleProps } from "./components/ThemeToggle";

// Components — Inputs
export { Input } from "./components/Input";
export { FloatingLabelInput, type FloatingLabelInputProps } from "./components/FloatingLabelInput";
export { Combobox, type ComboboxProps, type ComboboxOption } from "./components/Combobox";
export { SearchInput, type SearchInputProps } from "./components/SearchInput";
export { Select, type SelectProps, type SelectOption } from "./components/Select";
export { SegmentedButton, type SegmentedButtonProps } from "./components/SegmentedButton";
export { Switch, type SwitchProps } from "./components/Switch";
export { ReadOnlyField, type ReadOnlyFieldProps } from "./components/ReadOnlyField";

// Components — Feedback
export { Alert, type AlertProps } from "./components/Alert";
export { Badge, type BadgeProps, type BadgeVariant, type BadgeSize } from "./components/Badge";
export { Dialog, type DialogProps, type DialogAction } from "./components/Dialog";
export { ConfirmDialog, type ConfirmDialogProps } from "./components/ConfirmDialog";
export {
  Progress,
  type ProgressProps,
  type ProgressType,
  type ProgressColor,
} from "./components/Progress";
export { ReauthDialog, type ReauthDialogProps } from "./components/ReauthDialog";
export { Snackbar, type SnackbarProps, type SnackbarVariant } from "./components/Snackbar";
export { Toast, type ToastProps, type ToastVariant } from "./components/Toast";

// Components — Surfaces
export { Card, type CardProps } from "./components/Card";
export { Surface, type SurfaceProps } from "./components/Surface";
export { SectionLabel, type SectionLabelProps } from "./components/SectionLabel";
export { ActivityList, type ActivityListProps, type ActivityItem } from "./components/ActivityList";

// Components — Media
export { Avatar, type AvatarProps } from "./components/Avatar";
export { Icon, type IconProps } from "./components/Icon";
export { ImageCarousel, type ImageCarouselProps, type CarouselImage } from "./components/ImageCarousel";
export { Logo as LogoMirrorStack, type LogoProps } from "./components/LogoMirrorStack";

// Components — Data
export {
  DataTable,
  type DataTableProps,
  type ColumnDef,
  type SortState,
  type SortDirection,
} from "./components/DataTable";
export { Pagination, type PaginationProps } from "./components/Pagination";
export { FilterBar, type FilterBarProps, type FilterChip } from "./components/FilterBar";
export { Tabs, type TabsProps, type TabItem } from "./components/Tabs";

// Components — Files
export { DropZone, type DropZoneProps } from "./components/DropZone";
export { DropdownMenu, type DropdownMenuProps, type DropdownMenuItem, type DropdownMenuSeparator, type DropdownMenuEntry } from "./components/DropdownMenu";
export { FilePreview, type FilePreviewProps, type FilePreviewType } from "./components/FilePreview";
export {
  UploadProgress,
  type UploadProgressProps,
  type UploadItem,
  type UploadItemStatus,
} from "./components/UploadProgress";
export { EmptyState, type EmptyStateProps } from "./components/EmptyState";
export { ErrorState, type ErrorStateProps } from "./components/ErrorState";
export { Skeleton, type SkeletonProps } from "./components/Skeleton";

// Components — Settings
export {
  SettingsLayout,
  type SettingsLayoutProps,
  type SettingsNavItem,
  type SettingsNavSection,
} from "./components/SettingsLayout";
export {
  ModuleSettingsLayout,
  type ModuleSettingsLayoutProps,
  type SettingsTab,
} from "./components/ModuleSettingsLayout";

// Components — Misc
export { TabWithInverseCorners } from "./components/TabWithInverseCorners";
export { DevToolbar } from "./components/DevToolbar";

// Hooks
export {
  createApiClient,
  ApiError,
  type ApiConfig,
  type ApiClient,
  type RequestOptions,
} from "./hooks/useApi";
export { useDebounce } from "./hooks/useDebounce";
export {
  usePagination,
  type UsePaginationOptions,
  type PaginationState,
} from "./hooks/usePagination";
export {
  useUpload,
  type UseUploadReturn,
  type UploadConfig,
  type UploadResult,
  type UploadStatus,
} from "./hooks/useUpload";
