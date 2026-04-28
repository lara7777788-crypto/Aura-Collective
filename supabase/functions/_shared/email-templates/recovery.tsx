/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface RecoveryEmailProps {
  siteName: string
  confirmationUrl: string
}

export const RecoveryEmail = ({
  siteName,
  confirmationUrl,
}: RecoveryEmailProps) => {
  const actionUrl = new URL(confirmationUrl)
  const resetUrl = actionUrl.searchParams.get('redirect_to') || 'https://auracollective.io/reset-password'
  const continueUrl = `${resetUrl}${resetUrl.includes('?') ? '&' : '?'}continue=${encodeURIComponent(confirmationUrl)}`

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Reset your password for Aura Collective</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Reset your password</Heading>
          <Text style={text}>
            We received a request to reset your password for Aura Collective. Click
            the button below, then confirm once more to choose a new password.
          </Text>
          <Button style={button} href={continueUrl}>
            Reset Password
          </Button>
          <Text style={smallText}>
            This extra step protects your reset link from automated inbox security scans.
          </Text>
          <Text style={footer}>
            If you didn't request a password reset, you can safely ignore this
            email. Your password will not be changed.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default RecoveryEmail

const main = { backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif' }
const container = { padding: '32px 28px', maxWidth: '560px', margin: '0 auto' }
const h1 = {
  fontSize: '26px',
  fontWeight: 'bold' as const,
  color: '#0f172a',
  margin: '0 0 20px',
}
const text = {
  fontSize: '15px',
  color: '#334155',
  lineHeight: '1.6',
  margin: '0 0 20px',
}
const button = {
  backgroundColor: '#FACC15',
  color: '#0f172a',
  fontSize: '15px',
  fontWeight: 'bold' as const,
  borderRadius: '8px',
  padding: '12px 28px',
  textDecoration: 'none',
  display: 'inline-block',
}
const smallText = { fontSize: '13px', color: '#64748b', lineHeight: '1.5', margin: '18px 0 0' }
const footer = { fontSize: '12px', color: '#94a3b8', margin: '32px 0 0' }
