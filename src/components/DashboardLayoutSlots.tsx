import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import {
    DashboardLayout,
    ThemeSwitcher,
    type SidebarFooterProps,
} from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import ServicesPage from './slider/services';
import HomePage from '../pages/home';

// Navigation items
const NAVIGATION: Navigation = [
    { kind: 'header', title: 'Main items' },
    { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
    { segment: 'services', title: 'Services', icon: <ShoppingCartIcon /> },
    { segment: 'users', title: 'Users', icon: <PersonOutlineIcon /> },
    { segment: 'partners', title: 'Partners', icon: <HandshakeIcon /> },
];

// Logout handler
const handleLogout = () => {
    console.log('Logged out');
    localStorage.removeItem('userToken'); // Clear token if stored
    sessionStorage.clear(); // Clear session data if needed
    window.location.href = '/signin'; // Redirect to sign-in page
};

// Custom theme
const demoTheme = createTheme({
    cssVariables: { colorSchemeSelector: 'data-toolpad-color-scheme' },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
        values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 },
    },
});

// Dynamic page content rendering
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

// Toolbar with theme switcher
function ToolbarActionsSearch() {
    return (
        <Stack direction="row">
            <ThemeSwitcher />
        </Stack>
    );
}

// Sidebar footer
function SidebarFooter({ mini }: SidebarFooterProps) {
    return (
        <Typography
            variant="caption"
            sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}
        >
            {/* Placeholder for footer content */}
        </Typography>
    );
}

// Main dashboard layout component
interface DemoProps {
    window?: () => Window; // Optional prop for iframe compatibility
}

export default function DashboardLayoutSlots(props: DemoProps) {
    const { window } = props;

    const [session, setSession] = React.useState<{
        user: { name: string; email: string; image: string };
    } | null>({
        user: {
            name: 'Nevil Mali',
            email: 'admin@gmail.com',
            image: 'https://avatars.githubusercontent.com/u/75579671?v=4',
        },
    });

    const authentication = React.useMemo(
        () => ({
            signIn: () => {
                setSession({
                    user: {
                        name: 'Nevil Mali',
                        email: 'admin@gmail.com',
                        image: 'https://avatars.githubusercontent.com/u/75579671?v=4',
                    },
                });
                localStorage.setItem('userToken', 'sample-token');
            },
            signOut: handleLogout,
        }),
        []
    );

    const router = useDemoRouter('/dashboard');

    const demoWindow = window !== undefined ? window() : undefined;

    return (
        <AppProvider
            navigation={NAVIGATION}
            branding={{
                logo: <img src="QB-Logos.png" alt="QB logo" />,
                title: 'Q-Buddy (ADMIN)',
            }}
            router={router}
            theme={demoTheme}
            window={demoWindow}
            session={session}
            authentication={authentication}
        >
            <DashboardLayout
                defaultSidebarCollapsed
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
