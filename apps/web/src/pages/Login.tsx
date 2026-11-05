import { useState, type FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { colors } from "@game-library/tokens";
import { FullScreenViewport, Box, VStack } from "@game-library/armature";
import { Lattice } from "@game-library/lattice";
import { Modal, Input, Button, Overlay } from "@game-library/cinder";
import { Intent } from "@game-library/types";
import { useCurrentUser, useLogin } from "@game-library/sdk";
import { AppRoute } from "../routes";
import { Logo } from "../components/Logo";
import { PageLoader } from "../components/PageLoader";
import { latticeLayer, loginForm, errorText } from "./Login.css";

const LATTICE_CONFIG = {
  radius: 84,
  gap: 10,
  cols: 14,
  rows: 10,
  cornerRadius: 3,
  defaultFill: colors.sapphire[300].hex,
  defaultOpacity: 0.2,
  random: { seed: 7, missingRate: 0.25, opacityRange: [0.15, 0.55] as [number, number] },
  boot: { direction: "left-to-right" as const, hexDuration: 800, stagger: 80 },
  ambient: {
    direction: "left-to-right" as const,
    opacityRange: [0.3, 0.8] as [number, number],
    scaleRange: [0.985, 1.015] as [number, number],
    hexDuration: 2500,
    stagger: 120
  }
};

/** Login screen: animated hex lattice behind a gradient-edged modal form. */
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: user, isPending } = useCurrentUser();
  const login = useLogin();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: string } | null)?.from ?? AppRoute.Home;

  if (isPending) return <PageLoader label="Checking session…" />;
  if (user) return <Navigate to={from} replace />;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await login.mutateAsync({ email, password });
    navigate(from, { replace: true });
  };

  return (
    <FullScreenViewport>
      <Overlay />
      <Box absolute top={0} left={0} full className={latticeLayer}>
        <Lattice config={LATTICE_CONFIG} />
      </Box>
      <Box expand center layer5>
        <Modal showFooter={false} width={440} intent={Intent.Primary}>
          <form onSubmit={(e) => void handleSubmit(e)} className={loginForm}>
            <VStack gap={6} padding={8} center>
              <Logo size={3} />
              <VStack gap={3} style={{ width: "100%" }}>
                <Input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  gradientFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="password"
                  autoComplete="current-password"
                  gradientFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </VStack>
              {login.isError && (
                <span className={errorText} style={{ color: colors.ruby[400].hex }}>
                  Sign in failed. Check your email and password.
                </span>
              )}
              <Button type="submit" size="lg" disabled={!email || !password} loading={login.isPending}>
                Sign in
              </Button>
            </VStack>
          </form>
        </Modal>
      </Box>
    </FullScreenViewport>
  );
};
