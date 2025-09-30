# C91 Merchant Verification System - System Design

## Overview

The C91 Merchant Verification System is a React-based web application designed for managing merchant verification processes, case management, and risk assessment workflows. The system provides a comprehensive platform for banks and financial institutions to verify merchant applications, manage portfolios, and configure risk settings.

## Architecture Overview

### Technology Stack

- **Frontend Framework**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 7.1.2
- **State Management**: Redux Toolkit 2.9.0
- **Routing**: React Router DOM 7.8.2
- **UI Components**: Radix UI primitives with custom styling
- **Styling**: Tailwind CSS 3.4.17
- **Form Management**: React Hook Form 7.62.0 with Zod validation
- **HTTP Client**: Axios 1.11.0
- **Storage**: React Secure Storage 1.3.2
- **Charts**: Recharts 2.15.4
- **Icons**: Lucide React 0.542.0

## System Architecture

### High-Level Architecture

<svg width="800" height="400">
  <rect x="50" y="50" width="700" height="300" fill="none" stroke="#000" />
  <text x="350" y="80" text-anchor="middle">Frontend Application Layer</text>
  
  <rect x="100" y="100" width="120" height="60" fill="none" stroke="#000" />
  <text x="160" y="130" text-anchor="middle">React Components</text>
  
  <rect x="250" y="100" width="120" height="60" fill="none" stroke="#000" />
  <text x="310" y="130" text-anchor="middle">Redux Store</text>
  
  <rect x="400" y="100" width="120" height="60" fill="none" stroke="#000" />
  <text x="460" y="130" text-anchor="middle">Router System</text>
  
  <rect x="550" y="100" width="120" height="60" fill="none" stroke="#000" />
  <text x="610" y="130" text-anchor="middle">Error Boundaries</text>
  
  <rect x="100" y="180" width="120" height="60" fill="none" stroke="#000" />
  <text x="160" y="210" text-anchor="middle">API Service</text>
  
  <rect x="250" y="180" width="120" height="60" fill="none" stroke="#000" />
  <text x="310" y="210" text-anchor="middle">Secure Storage</text>
  
  <rect x="400" y="180" width="120" height="60" fill="none" stroke="#000" />
  <text x="460" y="210" text-anchor="middle">Form Validation</text>
  
  <rect x="550" y="180" width="120" height="60" fill="none" stroke="#000" />
  <text x="610" y="210" text-anchor="middle">Cache Manager</text>
  
  <rect x="100" y="260" width="120" height="60" fill="none" stroke="#000" />
  <text x="160" y="290" text-anchor="middle">Theme Provider</text>
  
  <rect x="250" y="260" width="120" height="60" fill="none" stroke="#000" />
  <text x="310" y="290" text-anchor="middle">I18n System</text>
  
  <rect x="400" y="260" width="120" height="60" fill="none" stroke="#000" />
  <text x="460" y="290" text-anchor="middle">Analytics & Logging</text>
  
  <rect x="550" y="260" width="120" height="60" fill="none" stroke="#000" />
  <text x="610" y="290" text-anchor="middle">Testing Utils</text>
</svg>

### Component Interaction Flow

<svg width="800" height="300">
  <rect x="50" y="50" width="120" height="60" fill="none" stroke="#000" />
  <text x="110" y="80" text-anchor="middle">User Interaction</text>
  
  <rect x="250" y="50" width="120" height="60" fill="none" stroke="#000" />
  <text x="310" y="80" text-anchor="middle">Router Guard</text>
  
  <rect x="450" y="50" width="120" height="60" fill="none" stroke="#000" />
  <text x="510" y="80" text-anchor="middle">Layout Component</text>
  
  <rect x="50" y="150" width="120" height="60" fill="none" stroke="#000" />
  <text x="110" y="180" text-anchor="middle">Error Boundary</text>
  
  <rect x="250" y="150" width="120" height="60" fill="none" stroke="#000" />
  <text x="310" y="180" text-anchor="middle">Redux Store</text>
  
  <rect x="450" y="150" width="120" height="60" fill="none" stroke="#000" />
  <text x="510" y="180" text-anchor="middle">Page Component</text>
  
  <rect x="50" y="250" width="120" height="60" fill="none" stroke="#000" />
  <text x="110" y="280" text-anchor="middle">Cache Layer</text>
  
  <rect x="250" y="250" width="120" height="60" fill="none" stroke="#000" />
  <text x="310" y="280" text-anchor="middle">API Service</text>
  
  <rect x="450" y="250" width="120" height="60" fill="none" stroke="#000" />
  <text x="510" y="280" text-anchor="middle">Form Validation</text>
  
  <!-- Arrows -->
  <path d="M170 80 L250 80" stroke="#000" marker-end="url(#arrowhead)" />
  <path d="M370 80 L450 80" stroke="#000" marker-end="url(#arrowhead)" />
  <path d="M170 180 L250 180" stroke="#000" marker-end="url(#arrowhead)" />
  <path d="M370 180 L450 180" stroke="#000" marker-end="url(#arrowhead)" />
  <path d="M170 280 L250 280" stroke="#000" marker-end="url(#arrowhead)" />
  <path d="M370 280 L450 280" stroke="#000" marker-end="url(#arrowhead)" />
  
  <!-- Arrow marker definition -->
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#000" />
    </marker>
  </defs>
</svg>

## Project Structure

### Core Directories
