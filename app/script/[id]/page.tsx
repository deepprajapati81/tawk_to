"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export default function ScriptPage() {
  const { id } = useParams<{ id: string }>();
  const [copied, setCopied] = useState(false);
  const [color, setColor] = useState("#3b82f6");

  useEffect(() => {
    if (!id) return;
    let mounted = true;

    fetch(`/api/widget/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (mounted && data && data.color) setColor(data.color);
      })
      .catch(() => {
        // ignore
      });

    return () => {
      mounted = false;
    };
  }, [id]);

  if (!id) return null;


  const [snippet, setSnippet] = useState(`<script src="/api/loader/${id}" async></script>`);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const absOrigin = window.location.origin || (process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000');
        setSnippet(`<script src="${absOrigin}/api/loader/${id}" async></script>`);
      }
    } catch (e) {}
  }, [id]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      alert("Copy failed. Please copy manually.");
    }
  };

  const [updating, setUpdating] = useState(false);
  const [updateStatus, setUpdateStatus] = useState<string | null>(null);

  const updateColor = async () => {
    try {
      setUpdating(true);
      setUpdateStatus(null);
      const res = await fetch(`/api/widget/${id}`, { method: 'PATCH', body: JSON.stringify({ color }), headers: { 'Content-Type': 'application/json' } });
      const json = await res.json();
      if (res.ok) {
        setUpdateStatus('Updated');
      } else {
        setUpdateStatus(json.error || 'Failed');
      }
    } catch (e) {
      setUpdateStatus('Failed');
    } finally {
      setUpdating(false);
      setTimeout(() => setUpdateStatus(null), 2000);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-xl w-full space-y-6">

        <h1 className="text-2xl font-bold">🎉 Widget Created Successfully</h1>

        <p className="text-gray-600 text-sm">
          Copy this script and paste before <code>&lt;/body&gt;</code>
        </p>

        <pre className="bg-black text-green-400 p-4 rounded text-sm overflow-x-auto select-all ">
          {snippet}
        </pre>

        <Button onClick={copyToClipboard} className="w-full bg-black text-white py-2 rounded hover:opacity-90">
          {copied ? "✅ Copied!" : "Copy Script"}
        </Button>

        <div className="mt-4 flex gap-2 items-center">
          <Input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
          <Button onClick={updateColor} disabled={updating} className="px-3 py-2 bg-blue-600 text-white rounded">
            {updating ? 'Updating...' : 'Update Color'}
          </Button>
        </div>

        {updateStatus && <div className="text-sm text-gray-600">{updateStatus}</div>}
      </div>
    </div>
  );
}
