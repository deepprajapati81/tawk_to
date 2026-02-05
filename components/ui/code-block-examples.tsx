/**
 * CodeBlock Component Examples
 * 
 * This file demonstrates various ways to use the CodeBlock component
 * throughout your application.
 */

import { CodeBlock } from "./code-block";
import { InlineCode } from "./inline-code";

// Example 1: HTML Code Block
export const HTMLExample = () => {
  const htmlCode = `<div class="container">
  <h1>Hello World</h1>
  <p>This is a beautiful code block!</p>
</div>`;

  return (
    <CodeBlock 
      code={htmlCode} 
      language="html"
      theme="light"
      primaryColor="#03a84e"
    />
  );
};

// Example 2: JavaScript with Line Numbers
export const JavaScriptExample = () => {
  const jsCode = `function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return \`Welcome \${name}\`;
}

const result = greet("Developer");
console.log(result);`;

  return (
    <CodeBlock 
      code={jsCode} 
      language="javascript"
      showLineNumbers={true}
      theme="light"
      primaryColor="#005eff"
    />
  );
};

// Example 3: CSS Dark Theme
export const CSSExample = () => {
  const cssCode = `.button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  color: white;
  font-weight: 600;
  transition: all 0.3s ease;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}`;

  return (
    <CodeBlock 
      code={cssCode} 
      language="css"
      theme="dark"
      primaryColor="#7866ff"
    />
  );
};

// Example 4: TypeScript/React Component
export const TypeScriptExample = () => {
  const tsCode = `import { useState } from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

export const Button = ({ label, onClick, variant = "primary" }: ButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await onClick();
    setIsLoading(false);
  };

  return (
    <button 
      onClick={handleClick}
      disabled={isLoading}
      className={\`btn btn-\${variant}\`}
    >
      {isLoading ? "Loading..." : label}
    </button>
  );
};`;

  return (
    <CodeBlock 
      code={tsCode} 
      language="typescript"
      showLineNumbers={true}
      theme="light"
      primaryColor="#03a84e"
    />
  );
};

// Example 5: Python Code
export const PythonExample = () => {
  const pythonCode = `def calculate_fibonacci(n):
    """Calculate the nth Fibonacci number."""
    if n <= 1:
        return n
    return calculate_fibonacci(n-1) + calculate_fibonacci(n-2)

# Generate first 10 Fibonacci numbers
fibonacci_sequence = [calculate_fibonacci(i) for i in range(10)]
print("Fibonacci sequence:", fibonacci_sequence)`;

  return (
    <CodeBlock 
      code={pythonCode} 
      language="python"
      theme="dark"
      primaryColor="#d42300"
    />
  );
};

// Example 6: JSON Configuration
export const JSONExample = () => {
  const jsonCode = `{
  "name": "my-widget",
  "version": "1.0.0",
  "config": {
    "theme": "light",
    "primaryColor": "#03a84e",
    "features": [
      "chat",
      "notifications",
      "analytics"
    ]
  },
  "settings": {
    "autoInit": true,
    "debug": false
  }
}`;

  return (
    <CodeBlock 
      code={jsonCode} 
      language="json"
      theme="light"
      primaryColor="#03a84e"
    />
  );
};

// Example 7: Inline Code Usage
export const InlineCodeExample = () => {
  return (
    <div className="space-y-4">
      <p>
        To install the package, run{" "}
        <InlineCode primaryColor="#03a84e">npm install my-package</InlineCode>
        {" "}in your terminal.
      </p>
      
      <p>
        Use the <InlineCode primaryColor="#005eff">useState</InlineCode> hook to manage
        component state in React.
      </p>

      <p>
        The <InlineCode primaryColor="#7866ff">async/await</InlineCode> syntax makes
        asynchronous code easier to read.
      </p>
    </div>
  );
};

// Example 8: Multi-line Script Tag (Like your widget)
export const WidgetScriptExample = ({ widgetId, baseUrl, color }: { 
  widgetId: string; 
  baseUrl: string;
  color: string;
}) => {
  const scriptCode = `<script src="${baseUrl}/api/loader/${widgetId}" async></script>`;

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Installation Instructions</h3>
      <p className="text-gray-600 text-sm">
        Copy and paste this code snippet before the closing <InlineCode>&lt;/body&gt;</InlineCode> tag:
      </p>
      <CodeBlock 
        code={scriptCode} 
        language="html"
        theme="light"
        primaryColor={color}
      />
    </div>
  );
};

// Example 9: Bash Commands
export const BashExample = () => {
  const bashCode = `# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start`;

  return (
    <CodeBlock 
      code={bashCode} 
      language="bash"
      theme="dark"
      primaryColor="#03a84e"
    />
  );
};

// Example 10: SQL Query
export const SQLExample = () => {
  const sqlCode = `SELECT 
  u.id,
  u.name,
  u.email,
  COUNT(o.id) as order_count,
  SUM(o.total) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= '2024-01-01'
GROUP BY u.id, u.name, u.email
ORDER BY total_spent DESC
LIMIT 10;`;

  return (
    <CodeBlock 
      code={sqlCode} 
      language="sql"
      showLineNumbers={true}
      theme="light"
      primaryColor="#005eff"
    />
  );
};
