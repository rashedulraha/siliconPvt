"use client";

import { useCMS } from "@/context/CMSContext";
import { useProperties } from "@/hooks/useProperties";
import { useMenu } from "@/hooks/useMenu";
import { useMedia } from "@/hooks/useMedia";
import { useBlog } from "@/hooks/useBlog";
import { useTeam } from "@/hooks/useTeam";
import { useLeads } from "@/hooks/useLeads";
import { useCMSExport } from "@/hooks/useCMSExport";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useSEO } from "@/hooks/useSEO";
import { useState } from "react";

/**
 * Phase 2: Functional CMS test page (unstyled).
 * Will be replaced with a premium dashboard in Phase 4.
 */
export default function AdminTestPage() {
  const { state, isHydrated, persistNow } = useCMS();
  const properties = useProperties();
  const menu = useMenu();
  const media = useMedia();
  const blog = useBlog();
  const team = useTeam();
  const leads = useLeads();
  const siteSettings = useSiteSettings();
  const seo = useSEO();
  const cmsExport = useCMSExport();

  const [newPropertyTitle, setNewPropertyTitle] = useState("");
  const [newMenuLabel, setNewMenuLabel] = useState("");
  const [newMenuHref, setNewMenuHref] = useState("");
  const [siteName, setSiteName] = useState(state.siteSettings.siteName);

  if (!isHydrated) {
    return <div style={{ padding: 24 }}>Loading CMS...</div>;
  }

  return (
    <div
      style={{
        padding: 24,
        fontFamily: "system-ui",
        maxWidth: 1200,
        margin: "0 auto",
      }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>
        🛠️ CMS Engine — Phase 2 Test
      </h1>
      <p style={{ color: "#666", marginBottom: 24 }}>
        Functional test page. Will be replaced with premium dashboard in Phase
        4.
      </p>

      {/* ============ STATE OVERVIEW ============ */}
      <section
        style={{
          marginBottom: 32,
          padding: 16,
          background: "#f5f5f5",
          borderRadius: 8,
        }}>
        <h2 style={{ fontSize: 20, marginBottom: 12 }}>📊 State Overview</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 12,
          }}>
          <StatCard label="Properties" value={properties.properties.length} />
          <StatCard label="Team" value={team.team.length} />
          <StatCard label="Blog Posts" value={blog.posts.length} />
          <StatCard label="Menu Items" value={menu.menu.length} />
          <StatCard label="Media Files" value={media.media.length} />
          <StatCard label="Leads" value={leads.leads.length} />
        </div>
        <button
          onClick={persistNow}
          style={{ marginTop: 12, padding: "6px 12px", cursor: "pointer" }}>
          💾 Force Save to localStorage
        </button>
      </section>

      {/* ============ SITE SETTINGS ============ */}
      <section
        style={{
          marginBottom: 32,
          padding: 16,
          border: "1px solid #ddd",
          borderRadius: 8,
        }}>
        <h2 style={{ fontSize: 20, marginBottom: 12 }}>⚙️ Site Settings</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            placeholder="Site Name"
            style={{ flex: 1, padding: 8 }}
          />
          <button
            onClick={() => siteSettings.updateSettings({ siteName })}
            style={{ padding: "8px 16px", cursor: "pointer" }}>
            Update
          </button>
        </div>
        <p style={{ marginTop: 8, fontSize: 14, color: "#666" }}>
          Current: <strong>{state.siteSettings.siteName}</strong>
        </p>
      </section>

      {/* ============ MENU MANAGEMENT ============ */}
      <section
        style={{
          marginBottom: 32,
          padding: 16,
          border: "1px solid #ddd",
          borderRadius: 8,
        }}>
        <h2 style={{ fontSize: 20, marginBottom: 12 }}>🧭 Menu Management</h2>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <input
            value={newMenuLabel}
            onChange={(e) => setNewMenuLabel(e.target.value)}
            placeholder="Label"
            style={{ flex: 1, padding: 8 }}
          />
          <input
            value={newMenuHref}
            onChange={(e) => setNewMenuHref(e.target.value)}
            placeholder="/path"
            style={{ flex: 1, padding: 8 }}
          />
          <button
            onClick={() => {
              if (newMenuLabel && newMenuHref) {
                menu.addMenuItem({ label: newMenuLabel, href: newMenuHref });
                setNewMenuLabel("");
                setNewMenuHref("");
              }
            }}
            style={{ padding: "8px 16px", cursor: "pointer" }}>
            + Add
          </button>
        </div>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {menu.menu.map((item, idx) => (
            <li
              key={item.id}
              style={{
                padding: 8,
                marginBottom: 4,
                background: "#fafafa",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
              <span>
                {idx + 1}. <strong>{item.label}</strong> → {item.href}
              </span>
              <div style={{ display: "flex", gap: 4 }}>
                <button
                  onClick={() => menu.moveMenuItem(item.id, "up")}
                  disabled={idx === 0}>
                  ↑
                </button>
                <button
                  onClick={() => menu.moveMenuItem(item.id, "down")}
                  disabled={idx === menu.menu.length - 1}>
                  ↓
                </button>
                <button onClick={() => menu.deleteMenuItem(item.id)}>🗑️</button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ============ PROPERTIES ============ */}
      <section
        style={{
          marginBottom: 32,
          padding: 16,
          border: "1px solid #ddd",
          borderRadius: 8,
        }}>
        <h2 style={{ fontSize: 20, marginBottom: 12 }}>🏠 Properties</h2>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <input
            value={newPropertyTitle}
            onChange={(e) => setNewPropertyTitle(e.target.value)}
            placeholder="New property title..."
            style={{ flex: 1, padding: 8 }}
          />
          <button
            onClick={() => {
              if (newPropertyTitle) {
                properties.addProperty({
                  title: newPropertyTitle,
                  description: "Description for " + newPropertyTitle,
                  price: 500000,
                  location: "New City",
                  address: "123 Test St",
                  bedrooms: 3,
                  bathrooms: 2,
                  area: 1500,
                  type: "sale",
                  category: "house",
                  images: [],
                  features: [],
                  agentId: "agent-1",
                  status: "available",
                });
                setNewPropertyTitle("");
              }
            }}
            style={{ padding: "8px 16px", cursor: "pointer" }}>
            + Add Property
          </button>
        </div>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            maxHeight: 300,
            overflowY: "auto",
          }}>
          {properties.properties.map((p) => (
            <li
              key={p.id}
              style={{
                padding: 8,
                marginBottom: 4,
                background: "#fafafa",
                display: "flex",
                justifyContent: "space-between",
              }}>
              <span>
                <strong>{p.title}</strong> — ${p.price.toLocaleString()} (
                {p.type})
              </span>
              <button onClick={() => properties.deleteProperty(p.id)}>
                🗑️
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* ============ MEDIA UPLOAD ============ */}
      <section
        style={{
          marginBottom: 32,
          padding: 16,
          border: "1px solid #ddd",
          borderRadius: 8,
        }}>
        <h2 style={{ fontSize: 20, marginBottom: 12 }}>🖼️ Media Upload</h2>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={async (e) => {
            if (e.target.files) {
              await media.uploadFiles(e.target.files);
              e.target.value = "";
            }
          }}
          style={{ marginBottom: 12 }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
            gap: 8,
          }}>
          {media.media.map((m) => (
            <div key={m.id} style={{ position: "relative" }}>
              <img
                src={m.url}
                alt={m.name}
                style={{
                  width: "100%",
                  height: 100,
                  objectFit: "cover",
                  borderRadius: 4,
                }}
              />
              <button
                onClick={() => media.deleteMedia(m.id)}
                style={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  background: "rgba(0,0,0,0.6)",
                  color: "white",
                  border: "none",
                  borderRadius: 4,
                  padding: "2px 6px",
                  cursor: "pointer",
                }}>
                ×
              </button>
              <p
                style={{
                  fontSize: 11,
                  marginTop: 4,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}>
                {m.name}
              </p>
            </div>
          ))}
        </div>
        {media.media.length === 0 && (
          <p style={{ color: "#999", fontSize: 14 }}>No media uploaded yet.</p>
        )}
        <p style={{ marginTop: 8, fontSize: 12, color: "#666" }}>
          Storage used: {media.getStorageUsage().kb} KB
        </p>
      </section>

      {/* ============ EXPORT / IMPORT ============ */}
      <section
        style={{
          marginBottom: 32,
          padding: 16,
          border: "1px solid #ddd",
          borderRadius: 8,
        }}>
        <h2 style={{ fontSize: 20, marginBottom: 12 }}>💾 Backup & Restore</h2>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            onClick={cmsExport.exportData}
            style={{
              padding: "8px 16px",
              cursor: "pointer",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: 4,
            }}>
            📤 Export JSON Backup
          </button>
          <button
            onClick={cmsExport.triggerImport}
            style={{
              padding: "8px 16px",
              cursor: "pointer",
              background: "#059669",
              color: "white",
              border: "none",
              borderRadius: 4,
            }}>
            📥 Import JSON
          </button>
          <button
            onClick={cmsExport.resetToDefaults}
            style={{
              padding: "8px 16px",
              cursor: "pointer",
              background: "#dc2626",
              color: "white",
              border: "none",
              borderRadius: 4,
            }}>
            ⚠️ Reset to Defaults
          </button>
        </div>
      </section>

      {/* ============ SEO PREVIEW ============ */}
      <section
        style={{
          marginBottom: 32,
          padding: 16,
          border: "1px solid #ddd",
          borderRadius: 8,
        }}>
        <h2 style={{ fontSize: 20, marginBottom: 12 }}>🔍 SEO Preview</h2>
        <div style={{ display: "grid", gap: 8 }}>
          {Object.entries(state.seo).map(([page, data]) => (
            <div key={page} style={{ padding: 8, background: "#fafafa" }}>
              <strong style={{ textTransform: "capitalize" }}>{page}</strong>
              <p style={{ color: "#2563eb", fontSize: 14, margin: "4px 0" }}>
                {data.title}
              </p>
              <p style={{ color: "#666", fontSize: 12 }}>{data.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ LEADS ============ */}
      <section
        style={{
          marginBottom: 32,
          padding: 16,
          border: "1px solid #ddd",
          borderRadius: 8,
        }}>
        <h2 style={{ fontSize: 20, marginBottom: 12 }}>📥 Leads</h2>
        <p style={{ marginBottom: 8, fontSize: 14 }}>
          Total: <strong>{leads.stats.total}</strong> | New:{" "}
          <strong>{leads.stats.new}</strong> | Contacted:{" "}
          <strong>{leads.stats.contacted}</strong> | Qualified:{" "}
          <strong>{leads.stats.qualified}</strong> | Closed:{" "}
          <strong>{leads.stats.closed}</strong>
        </p>
        <button
          onClick={() =>
            leads.addLead({
              name: "Test Lead " + Math.floor(Math.random() * 1000),
              email: "test@example.com",
              phone: "+1 555-0000",
              message: "Interested in a property",
            })
          }
          style={{ padding: "8px 16px", cursor: "pointer" }}>
          + Add Test Lead
        </button>
        {leads.leads.length > 0 && (
          <ul style={{ marginTop: 12, listStyle: "none", padding: 0 }}>
            {leads.leads.slice(0, 5).map((l) => (
              <li
                key={l.id}
                style={{
                  padding: 8,
                  marginBottom: 4,
                  background: "#fafafa",
                  display: "flex",
                  justifyContent: "space-between",
                }}>
                <span>
                  <strong>{l.name}</strong> — {l.status}
                </span>
                <div>
                  <select
                    value={l.status}
                    onChange={(e) =>
                      leads.updateLeadStatus(l.id, e.target.value as any)
                    }
                    style={{ marginRight: 8 }}>
                    <option value="new">new</option>
                    <option value="contacted">contacted</option>
                    <option value="qualified">qualified</option>
                    <option value="closed">closed</option>
                  </select>
                  <button onClick={() => leads.deleteLead(l.id)}>🗑️</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ============ RAW STATE ============ */}
      <details style={{ marginBottom: 32 }}>
        <summary style={{ cursor: "pointer", fontSize: 16, marginBottom: 8 }}>
          🔬 Raw CMS State (debug)
        </summary>
        <pre
          style={{
            background: "#1e1e1e",
            color: "#d4d4d4",
            padding: 16,
            borderRadius: 8,
            overflow: "auto",
            maxHeight: 400,
            fontSize: 12,
          }}>
          {JSON.stringify(state, null, 2)}
        </pre>
      </details>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div
      style={{
        padding: 12,
        background: "white",
        borderRadius: 6,
        textAlign: "center",
      }}>
      <div style={{ fontSize: 24, fontWeight: 700 }}>{value}</div>
      <div style={{ fontSize: 12, color: "#666" }}>{label}</div>
    </div>
  );
}
