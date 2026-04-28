import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Html, Link, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Aura Collective'
const SITE_URL = 'https://auracollective.io'

interface WelcomeProps {
  name?: string
}

const WelcomeEmail = ({ name }: WelcomeProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Welcome to {SITE_NAME} — your Web4 home</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          {name ? `Welcome, ${name} ✨` : 'Welcome to Aura Collective ✨'}
        </Heading>
        <Text style={text}>
          You're in. {SITE_NAME} is an open developer platform built on Web4
          principles — your data is yours, your work stays yours, and the
          community owns the commons together.
        </Text>
        <Text style={text}>
          Here's how to get started:
        </Text>
        <Text style={listItem}>• Explore featured projects on the Explore page</Text>
        <Text style={listItem}>• Set up your profile so the community can find you</Text>
        <Text style={listItem}>• Publish your first project or star one you love</Text>

        <Section style={{ textAlign: 'center', margin: '32px 0' }}>
          <Button href={`${SITE_URL}/dashboard`} style={button}>
            Open your dashboard
          </Button>
        </Section>

        <Text style={text}>
          Questions? Just reply — Lara reads every message.
        </Text>

        <Text style={footer}>
          {SITE_NAME} · <Link href={`${SITE_URL}/terms`} style={link}>Terms</Link> ·{' '}
          <Link href={`${SITE_URL}/privacy`} style={link}>Privacy</Link> ·{' '}
          <Link href={`${SITE_URL}/refunds`} style={link}>Refunds</Link>
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: WelcomeEmail,
  subject: 'Welcome to Aura Collective ✨',
  displayName: 'Welcome email',
  previewData: { name: 'Lara' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif' }
const container = { padding: '32px 28px', maxWidth: '560px', margin: '0 auto' }
const h1 = { fontSize: '26px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 20px' }
const text = { fontSize: '15px', color: '#334155', lineHeight: '1.6', margin: '0 0 16px' }
const listItem = { fontSize: '15px', color: '#334155', lineHeight: '1.6', margin: '0 0 6px', paddingLeft: '4px' }
const button = {
  backgroundColor: '#FACC15',
  color: '#0f172a',
  padding: '12px 28px',
  borderRadius: '8px',
  fontWeight: 'bold',
  fontSize: '15px',
  textDecoration: 'none',
  display: 'inline-block',
}
const footer = { fontSize: '12px', color: '#94a3b8', margin: '32px 0 0', textAlign: 'center' as const }
const link = { color: '#94a3b8', textDecoration: 'underline' }
