import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import {
    DashboardLayout,
    ThemeSwitcher,
    type SidebarFooterProps,
} from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import HomePage from '../map/homeMap';
import PushNotificationButton from './notification/PushNotificationButton';
import ServicesPage from './services';

const NAVIGATION: Navigation = [
    {
        kind: 'header',
        title: 'Main items',
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'services',
        title: 'Services',
        icon: <ShoppingCartIcon />,
    },
];

const demoTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function DemoPageContent({ pathname }: { pathname: string }) {
    if (pathname === "/dashboard") {
        return <HomePage />;
    }
    if (pathname === "/services") {
        return <ServicesPage />;
    }
    return (
        <Box
            sx={{
                py: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            <HomePage />
        </Box>
    );
}

function ToolbarActionsSearch() {
    return (
        <Stack direction="row">
            <Tooltip title="Search" enterDelay={1000}>
                <div>
                    <IconButton
                        type="button"
                        aria-label="search"
                        sx={{
                            display: { xs: 'inline', md: 'none' },
                        }}
                    >
                        <SearchIcon />
                    </IconButton>
                </div>
            </Tooltip>
            <PushNotificationButton />
            <TextField
                label="Search"
                variant="outlined"
                size="small"
                slotProps={{
                    input: {
                        endAdornment: (
                            <IconButton type="button" aria-label="search" size="small">
                                <SearchIcon />
                            </IconButton>
                        ),
                        sx: { pr: 0.5 },
                    },
                }}
                sx={{ display: { xs: 'none', md: 'inline-block' }, mr: 1 }}
            />
            <ThemeSwitcher />
        </Stack>
    );
}

function SidebarFooter({ mini }: SidebarFooterProps) {
    return (
        <Typography
            variant="caption"
            sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}
        >
            {/* Example footer content */}
        </Typography>
    );
}

interface DemoProps {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window?: () => Window;
}

export default function DashboardLayoutSlots(props: DemoProps) {
    const { window } = props;

    const [session, setSession] = React.useState<{
        user: {
            name: string;
            email: string;
            image: string;
        };
    } | null>({
        user: {
            name: 'Nevil Mali',
            email: 'admin@gmail.com',
            image: 'https://avatars.githubusercontent.com/u/75579671?v=4',
        },
    });

    const authentication = React.useMemo(() => ({
        signIn: () => {
            setSession({
                user: {
                    name: 'Nevil Mali',
                    email: 'admin@gmail.com',
                    image: 'https://avatars.githubusercontent.com/u/75579671?v=4',
                },
            });
        },
        signOut: () => {
            setSession(null);
        },
    }), []);

    const router = useDemoRouter('/dashboard');

    // Remove this const when copying and pasting into your project.
    const demoWindow = window !== undefined ? window() : undefined;

    return (
        <AppProvider
            navigation={NAVIGATION}
            branding={{
                logo: <img src="/img/logo.png" alt="QB logo"
                // style={{ height: "80px", width: "40px" }}
                />,
                title: 'Q-Buddy',
            }}
            router={router}
            theme={demoTheme}
            window={demoWindow}
            session={session}
            authentication={authentication}
        >
            <DashboardLayout defaultSidebarCollapsed
                slots={{
                    toolbarActions: ToolbarActionsSearch,
                    sidebarFooter: SidebarFooter,
                }}
            >
                <DemoPageContent pathname={router.pathname} />
            </DashboardLayout>
        </AppProvider>
    );
}
