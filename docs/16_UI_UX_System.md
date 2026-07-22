# UI/UX Design System

> Enterprise Design System for TwinForge AI

---

# Document Information

| Field | Value |
|-------|-------|
| Document | UI/UX Design System |
| Version | 1.0 |
| Status | Active |
| Project | TwinForge AI |

---

# Purpose

This document defines the visual language and user experience principles of TwinForge AI.

The design system ensures consistency across every screen, component, and interaction.

It serves as the single source of truth for designers and developers.

---

# Design Philosophy

TwinForge AI is not a colorful student dashboard.

It is an enterprise-grade industrial operating platform.

The interface should feel:

- Professional
- Minimal
- Intelligent
- Modern
- Fast
- Data-driven
- Premium

---

# Inspiration

Visual Inspiration

- Tesla
- Siemens
- Microsoft Fluent
- GitHub
- Vercel
- Linear
- Stripe Dashboard

Interaction Inspiration

- Figma
- Notion
- Framer
- Raycast

---

# Design Principles

Every screen should prioritize:

- Clarity
- Simplicity
- Readability
- Consistency
- Speed
- Accessibility

Avoid unnecessary decorations.

Data should always be the focus.

---

# Theme

Primary Theme

Dark Mode

Future

Light Mode

Auto Theme

---

# Color Palette

## Background

Primary

#0F172A

Secondary

#111827

Surface

#1F2937

Card

#1E293B

Border

#334155

---

## Text

Primary

#F8FAFC

Secondary

#CBD5E1

Muted

#94A3B8

Disabled

#64748B

---

## Status Colors

Healthy

Green

#22C55E

Warning

Yellow

#FACC15

High Risk

Orange

#F97316

Critical

Red

#EF4444

Offline

Gray

#6B7280

Maintenance

Blue

#3B82F6

---

# Typography

Font Family

Inter

Fallback

System UI

Font Weights

Regular

400

Medium

500

SemiBold

600

Bold

700

---

# Font Sizes

Display

48px

Page Title

32px

Section Title

24px

Heading

20px

Body

16px

Caption

14px

Small Label

12px

---

# Spacing System

Base Unit

8px

Spacing Scale

4

8

12

16

24

32

48

64

96

Use consistent spacing across the platform.

---

# Border Radius

Small

8px

Medium

12px

Large

16px

Modal

24px

Buttons

12px

Cards

16px

---

# Shadows

Level 1

Small elevation

Level 2

Cards

Level 3

Dialogs

Level 4

Floating Panels

Shadows should be subtle.

---

# Grid System

Desktop

12 Columns

Tablet

8 Columns

Mobile

4 Columns

Maximum Content Width

1600px

---

# Layout

Application Layout

```
+------------------------------------------------+

 Sidebar

|

 Top Navigation

|

 Main Content

|

 Status Bar

+------------------------------------------------+
```

---

# Sidebar

Contains

Dashboard

Machines

Sensors

Predictions

Alerts

Maintenance

Analytics

Energy

Digital Twin

AI Assistant

Settings

---

# Top Navigation

Contains

Search

Notifications

Factory Selector

Theme Toggle

User Profile

Quick Actions

---

# Cards

Cards should contain:

Title

Primary Metric

Trend Indicator

Status

Action

Cards must remain clean and readable.

---

# Buttons

Primary

Filled

Secondary

Outlined

Ghost

Minimal

Danger

Red

Icon Button

Square

---

# Inputs

Text Input

Number Input

Dropdown

Date Picker

Search Bar

Switch

Checkbox

Radio Button

---

# Tables

Enterprise tables should support:

Sorting

Filtering

Pagination

Sticky Header

Column Resize

Search

Export

---

# Charts

Technology

Recharts

Charts

Line Chart

Area Chart

Bar Chart

Pie Chart

Gauge

Heatmap

Trend Chart

Timeline

Charts should support:

Zoom

Hover

Tooltips

Export

---

# Icons

Library

Lucide React

Rules

Simple

Minimal

Consistent Size

No decorative icons

---

# Motion Design

Animations should communicate state.

Examples

Card Hover

150ms

Sidebar Transition

250ms

Modal

300ms

Page Transition

250ms

Loading Skeleton

Pulse Animation

Avoid excessive animation.

---

# Notifications

Types

Success

Info

Warning

Error

Toast Position

Top Right

Duration

3–5 seconds

Critical alerts require manual dismissal.

---

# Empty States

Every empty screen should provide:

Illustration

Description

Primary Action

Example

"No machines registered yet."

Button

Register Machine

---

# Loading States

Skeleton Screens

Progress Indicators

Spinner (only when necessary)

Never leave blank screens.

---

# Accessibility

Minimum Contrast Ratio

WCAG AA

Keyboard Navigation

Required

Focus Indicators

Visible

ARIA Labels

Required

Screen Reader Support

Supported

---

# Responsive Design

Desktop

Primary Experience

Tablet

Fully Supported

Mobile

Monitoring Dashboard Only

Future

Native Mobile App

---

# Dashboard Rules

Health Score should always be visible.

Critical alerts remain pinned.

AI recommendations appear above analytics.

Most important KPIs stay above the fold.

---

# Component Library

Core Components

Button

Card

Badge

Modal

Tooltip

Dropdown

Avatar

Tabs

Table

Toast

Skeleton

Progress

Gauge

Feature Components

Machine Card

Health Gauge

Sensor Card

Prediction Card

Alert Card

Maintenance Timeline

AI Chat Panel

Digital Twin Viewer

Factory Overview

---

# Future Design Features

Command Palette

Dockable Panels

Resizable Widgets

Custom Dashboards

Theme Customization

White Label Branding

PWA Support

Offline Mode

---

# Related Documents

09_Frontend_Architecture.md

15_Digital_Twin.md

17_Security_Model.md

22_Product_Roadmap.md

---

# Summary

The TwinForge AI Design System establishes a unified visual and interaction language for the platform.

By following these principles, TwinForge AI delivers a consistent, accessible, and enterprise-grade experience while remaining scalable as new features and products are introduced.

---