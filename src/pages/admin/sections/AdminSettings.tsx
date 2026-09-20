import { useState, useEffect, useCallback } from "react";
import { Save, CheckCircle, Loader2 } from "lucide-react";
import { adminGetSetting, adminSetSetting } from "../../../lib/db";
import { supabase } from "../../../lib/supabase";
import { defaultSiteSettings, type SiteSettings } from "../../../lib/siteSettingsDefaults";
import { useSiteSettings } from "../../../context/SiteSettingsContext";

type Settings = SiteSettings;

const defaults: Settings = defaultSiteSettings;

const inp = "w-full rounded-sm border border-charcoal/15 bg-beige px-3 py-2.5 font-body text-sm focus-ring";
const lbl = "block font-body text-xs uppercase tracking-widest2 text-charcoal/50 mb-1.5";

export function AdminSettings() {
  const { refresh } = useSiteSettings();
  const [settings, setSettings] = useState<Settings>(defaults);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [saved, setSaved]       = useState(false);
  const [newPw, setNewPw]       = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwBusy, setPwBusy]     = useState(false);
  const [pwMsg, setPwMsg]       = useState<{ text: string; ok: boolean } | null>(null);

  const set = (key: keyof Settings, val: string) =>
    setSettings((s) => ({ ...s, [key]: val }));

  /* Load all settings from Supabase */
  const load = useCallback(async () => {
    setLoading(true);
    const loaded: Partial<Settings> = {};
    await Promise.all(
      (Object.keys(defaults) as (keyof Settings)[]).map(async (key) => {
        const val = await adminGetSetting(key);
        if (val !== null) loaded[key] = val;
      })
    );
    setSettings((s) => ({ ...s, ...loaded }));
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  /* Save all settings */
  const save = async () => {
    setSaving(true);
    await Promise.all(
      (Object.entries(settings) as [keyof Settings, string][]).map(([k, v]) =>
        adminSetSetting(k, v)
      )
    );
    setSaving(false);
    setSaved(true);
    refresh();
    setTimeout(() => setSaved(false), 3000);
  };

  /* Change password via Supabase Auth */
  const changePassword = async () => {
    if (!newPw) return;
    if (newPw !== confirmPw) { setPwMsg({ text: "Passwords do not match.", ok: false }); return; }
    if (newPw.length < 8)    { setPwMsg({ text: "Password must be at least 8 characters.", ok: false }); return; }
    setPwBusy(true);
    const { error } = await supabase.auth.updateUser({ password: newPw });
    setPwBusy(false);
    if (error) setPwMsg({ text: error.message, ok: false });
    else {
      setPwMsg({ text: "Password updated successfully.", ok: true });
      setNewPw(""); setConfirmPw("");
      setTimeout(() => setPwMsg(null), 4000);
    }
  };

  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-charcoal/30" strokeWidth={1.5} />
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-3xl text-charcoal">Settings</h1>
      <p className="mt-1 font-body text-sm text-charcoal/50">Contact details and site information — changes save to Supabase and apply immediately.</p>

      <div className="mt-10 space-y-10">
        {/* Brand */}
        <section>
          <p className="mb-5 font-body text-xs uppercase tracking-widest2 text-charcoal/40">Brand</p>
          <div className="space-y-4">
            <div>
              <label className={lbl}>Brand Name</label>
              <input value={settings.brand_name} onChange={(e) => set("brand_name", e.target.value)} className={inp} />
            </div>
            <div>
              <label className={lbl}>Tagline</label>
              <input value={settings.tagline} onChange={(e) => set("tagline", e.target.value)} className={inp} />
            </div>
          </div>
        </section>

        {/* Contact */}
        <section>
          <p className="mb-5 font-body text-xs uppercase tracking-widest2 text-charcoal/40">Contact Details</p>
          <div className="space-y-4">
            <div>
              <label className={lbl}>Instagram Handle</label>
              <input value={settings.instagram_handle} onChange={(e) => set("instagram_handle", e.target.value)} className={inp} placeholder="@kala.heritage" />
            </div>
            <div>
              <label className={lbl}>WhatsApp Number (with country code, no +)</label>
              <input value={settings.whatsapp_number} onChange={(e) => set("whatsapp_number", e.target.value)} className={inp} placeholder="910000000000" />
              <p className="mt-1 font-body text-[11px] text-charcoal/35">Used to generate WhatsApp links throughout the site.</p>
            </div>
            <div>
              <label className={lbl}>Email</label>
              <input type="email" value={settings.email} onChange={(e) => set("email", e.target.value)} className={inp} />
            </div>
            <div>
              <label className={lbl}>Business Hours</label>
              <input value={settings.business_hours} onChange={(e) => set("business_hours", e.target.value)} className={inp} />
            </div>
          </div>
        </section>

        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 rounded-sm bg-charcoal px-6 py-3 font-body text-[13px] uppercase tracking-widest2 text-ivory transition-colors hover:bg-terracotta disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
          : saved  ? <CheckCircle className="h-4 w-4" strokeWidth={1.5} />
          :           <Save className="h-4 w-4" strokeWidth={1.5} />}
          {saving ? "Saving…" : saved ? "Saved" : "Save Settings"}
        </button>

        {/* Change password */}
        <section className="border-t border-charcoal/10 pt-8">
          <p className="mb-5 font-body text-xs uppercase tracking-widest2 text-charcoal/40">Change Admin Password</p>
          <div className="space-y-4">
            <div>
              <label className={lbl}>New Password</label>
              <input type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} className={inp} />
            </div>
            <div>
              <label className={lbl}>Confirm New Password</label>
              <input type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} className={inp} />
            </div>
            {pwMsg && <p className={`font-body text-xs ${pwMsg.ok ? "text-green-600" : "text-terracotta"}`}>{pwMsg.text}</p>}
            <button
              onClick={changePassword}
              disabled={pwBusy}
              className="flex items-center gap-2 rounded-sm border border-charcoal/15 px-5 py-2.5 font-body text-[13px] uppercase tracking-widest2 text-charcoal transition-colors hover:border-charcoal/30 disabled:opacity-50"
            >
              {pwBusy && <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.5} />}
              {pwBusy ? "Updating…" : "Update Password"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
