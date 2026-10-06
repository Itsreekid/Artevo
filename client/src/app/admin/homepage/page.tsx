'use client';

import { useState, useEffect } from 'react';
import { Loader2, Save, Home, Image as ImageIcon, ChevronDown, ChevronUp, Tag, Star } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import type { Product } from '@/types';

export default function HomepageSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [openSections, setOpenSections] = useState({ hero: false, spotlight: false, space: false, vibe: false });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };
  
  const [settings, setSettings] = useState<any>({
    featured_product_id: '',
    spotlight_image_url: '',
    drop_label: 'DROP 001',
    headline: 'THE WALL RACK.',
    subtitle: 'A little thing.\\nA completely different wall.',
    description: 'Made from natural wood and designed to turn everyday storage into part of the room.',
    enabled: true,
    
    hero_image_url: '',
    hero_line1: 'Your Wall.',
    hero_line2: 'Your Vibe.',
    hero_subtitle: 'A little piece that makes your space feel more like you.',
    hero_cta_label: 'SHOP THE FIRST DROP',
    
    space_title: 'See it in your space.',
    space_subtitle: 'Different rooms. Same idea.\\nMake the space feel like yours.',
    space_items: [
      { mood: 'MINIMAL', product_id: '', image_url: '' },
      { mood: 'COZY', product_id: '', image_url: '' },
      { mood: 'CREATIVE', product_id: '', image_url: '' }
    ],
    vibe_title: 'Shop the Vibe.',
    vibe_subtitle: 'Pieces for walls, corners, shelves and everything in between.',
    vibe_items: [
      { label: 'WALL', category_id: '', image_url: '', is_soon: false },
      { label: 'LIGHT', category_id: '', image_url: '', is_soon: true },
      { label: 'DECOR', category_id: '', image_url: '', is_soon: true }
    ]
  });

  useEffect(() => {
    Promise.all([
      fetch('/api/homepage-settings').then(r => r.json()),
      fetch('/api/products').then(r => r.json()),
      fetch('/api/categories').then(r => r.json())
    ]).then(([settingsData, productsData, categoriesData]) => {
      const parsedSpaceItems = typeof settingsData.space_items === 'string' 
        ? JSON.parse(settingsData.space_items) 
        : settingsData.space_items;
      const parsedVibeItems = typeof settingsData.vibe_items === 'string'
        ? JSON.parse(settingsData.vibe_items)
        : settingsData.vibe_items;
        
      setSettings((prev: any) => ({
        ...prev,
        ...settingsData,
        space_items: Array.isArray(parsedSpaceItems) && parsedSpaceItems.length ? parsedSpaceItems : prev.space_items,
        vibe_items: Array.isArray(parsedVibeItems) && parsedVibeItems.length ? parsedVibeItems : prev.vibe_items
      }));
      setProducts(Array.isArray(productsData.data) ? productsData.data.filter((p: Product) => p.is_active) : []);
      setCategories(Array.isArray(categoriesData?.data) ? categoriesData.data : (Array.isArray(categoriesData) ? categoriesData : []));
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setSettings((prev: any) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSpaceItemChange = (index: number, field: string, value: string) => {
    const newItems = [...settings.space_items];
    newItems[index] = { ...newItems[index], [field]: value };
    setSettings((prev: any) => ({ ...prev, space_items: newItems }));
  };

  const addSpaceItem = () => {
    setSettings((prev: any) => ({
      ...prev,
      space_items: [...prev.space_items, { mood: 'NEW MOOD', product_id: '', image_url: '' }]
    }));
  };

  const removeSpaceItem = (index: number) => {
    setSettings((prev: any) => ({
      ...prev,
      space_items: prev.space_items.filter((_: any, i: number) => i !== index)
    }));
  };

  const handleVibeItemChange = (index: number, field: string, value: any) => {
    const newItems = [...settings.vibe_items];
    newItems[index] = { ...newItems[index], [field]: value };
    setSettings((prev: any) => ({ ...prev, vibe_items: newItems }));
  };

  const addVibeItem = () => {
    setSettings((prev: any) => ({
      ...prev,
      vibe_items: [...prev.vibe_items, { label: 'NEW VIBE', category_id: '', image_url: '', is_soon: false }]
    }));
  };

  const removeVibeItem = (index: number) => {
    setSettings((prev: any) => ({
      ...prev,
      vibe_items: prev.vibe_items.filter((_: any, i: number) => i !== index)
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/homepage-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (!res.ok) throw new Error('Save failed');
      alert('Paramètres enregistrés avec succès!');
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la sauvegarde.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
        <Loader2 size={32} className="lucide-spin" style={{ color: '#0057D9' }} />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#1B1B1B' }}>Paramètres Accueil</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: '#0057D9', color: '#fff', border: 'none',
            padding: '12px 24px', borderRadius: '8px', fontWeight: 600,
            cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1
          }}
        >
          {saving ? <Loader2 size={18} className="lucide-spin" /> : <Save size={18} />}
          Enregistrer
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* HERO SECTION */}
        <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => toggleSection('hero')}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Home size={20} color="#0057D9" /> Section Hero (Haut de page)
            </h2>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              {openSections.hero ? <ChevronUp size={20} color="#6B6B6B" /> : <ChevronDown size={20} color="#6B6B6B" />}
            </button>
          </div>
          
          {openSections.hero && (
            <div style={{ marginTop: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Texte Ligne 1</label>
              <input type="text" name="hero_line1" value={settings.hero_line1} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Texte Ligne 2</label>
              <input type="text" name="hero_line2" value={settings.hero_line2} onChange={handleChange} style={inputStyle} />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Sous-titre</label>
            <input type="text" name="hero_subtitle" value={settings.hero_subtitle} onChange={handleChange} style={inputStyle} />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Texte du Bouton (CTA)</label>
            <input type="text" name="hero_cta_label" value={settings.hero_cta_label} onChange={handleChange} style={inputStyle} />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Image Hero</label>
            <ImageUpload
              value={settings.hero_image_url}
              onChange={(url) => setSettings({ ...settings, hero_image_url: url })}
              onUploading={() => {}}
              folder="gallery"
              requireSquare={false}
            />
          </div>
            </div>
          )}
        </div>

        {/* SHOP THE VIBE */}
        <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => toggleSection('vibe')}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Tag size={20} color="#0057D9" /> Section "Shop the Vibe"
            </h2>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              {openSections.vibe ? <ChevronUp size={20} color="#6B6B6B" /> : <ChevronDown size={20} color="#6B6B6B" />}
            </button>
          </div>

          {openSections.vibe && (
            <div style={{ marginTop: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Titre Section</label>
              <input type="text" name="vibe_title" value={settings.vibe_title} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Sous-titre</label>
              <textarea name="vibe_subtitle" value={settings.vibe_subtitle} onChange={handleChange} style={{...inputStyle, minHeight: '44px'}} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {settings.vibe_items.map((item: any, i: number) => (
              <div key={i} style={{ padding: '16px', border: '1px solid #E5E7EB', borderRadius: '8px', display: 'grid', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ margin: 0, fontWeight: 700 }}>Catégorie {i + 1}</h4>
                  <button onClick={() => removeVibeItem(i)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>Supprimer</button>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 100px', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Label</label>
                    <input type="text" value={item.label} onChange={(e) => handleVibeItemChange(i, 'label', e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Catégorie Liée</label>
                    <select value={item.category_id} onChange={(e) => handleVibeItemChange(i, 'category_id', e.target.value)} style={inputStyle}>
                      <option value="">-- Aucune --</option>
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', paddingTop: '20px' }}>
                    <input type="checkbox" checked={item.is_soon} onChange={(e) => handleVibeItemChange(i, 'is_soon', e.target.checked)} />
                    <label style={{ fontSize: '12px', fontWeight: 600 }}>SOON</label>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Image Spécifique</label>
                  <ImageUpload
                    value={item.image_url}
                    onChange={(url) => handleVibeItemChange(i, 'image_url', url)}
                    onUploading={() => {}}
                    folder="gallery"
                    requireSquare={false}
                  />
                </div>
              </div>
            ))}
            <button onClick={addVibeItem} style={{ padding: '12px', background: '#F3F4F6', border: '1px dashed #D1D5DB', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
              + Ajouter une Catégorie
            </button>
          </div>
            </div>
          )}
        </div>

        {/* SPOTLIGHT / DROP INFO */}
        <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => toggleSection('spotlight')}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Star size={20} color="#0057D9" /> Produit Mis en Avant (Drop / Spotlight)
            </h2>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              {openSections.spotlight ? <ChevronUp size={20} color="#6B6B6B" /> : <ChevronDown size={20} color="#6B6B6B" />}
            </button>
          </div>
          
          {openSections.spotlight && (
            <div style={{ marginTop: '20px' }}>
              <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Produit Sélectionné</label>
            <select name="featured_product_id" value={settings.featured_product_id || ''} onChange={handleChange} style={inputStyle}>
              <option value="">-- Sélectionner un produit (Auto-fallback au dernier) --</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Image Spécifique (Optionnelle)</label>
            <ImageUpload
              value={settings.spotlight_image_url}
              onChange={(url) => setSettings({ ...settings, spotlight_image_url: url })}
              onUploading={() => {}}
              folder="gallery"
              requireSquare={false}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Label Drop</label>
              <input type="text" name="drop_label" value={settings.drop_label} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Titre principal</label>
              <input type="text" name="headline" value={settings.headline} onChange={handleChange} style={inputStyle} />
            </div>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Sous-titre (\n pour retour à la ligne)</label>
            <textarea name="subtitle" value={settings.subtitle} onChange={handleChange} style={{...inputStyle, minHeight: '80px'}} />
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Description</label>
            <textarea name="description" value={settings.description} onChange={handleChange} style={{...inputStyle, minHeight: '80px'}} />
          </div>
            </div>
          )}
        </div>

        {/* SEE IT IN YOUR SPACE */}
        <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => toggleSection('space')}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ImageIcon size={20} color="#0057D9" /> Section "See it in your space"
            </h2>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              {openSections.space ? <ChevronUp size={20} color="#6B6B6B" /> : <ChevronDown size={20} color="#6B6B6B" />}
            </button>
          </div>

          {openSections.space && (
            <div style={{ marginTop: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Titre Section</label>
              <input type="text" name="space_title" value={settings.space_title} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Sous-titre (\n pour retour à la ligne)</label>
              <textarea name="space_subtitle" value={settings.space_subtitle} onChange={handleChange} style={{...inputStyle, minHeight: '44px'}} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {settings.space_items.map((item: any, i: number) => (
              <div key={i} style={{ padding: '16px', border: '1px solid #E5E7EB', borderRadius: '8px', display: 'grid', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ margin: 0, fontWeight: 700 }}>Card {i + 1}</h4>
                  <button onClick={() => removeSpaceItem(i)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>Supprimer</button>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Mood / Label</label>
                    <input type="text" value={item.mood} onChange={(e) => handleSpaceItemChange(i, 'mood', e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Produit Lié</label>
                    <select value={item.product_id} onChange={(e) => handleSpaceItemChange(i, 'product_id', e.target.value)} style={inputStyle}>
                      <option value="">-- Aucun lien --</option>
                      {products.map(p => (
                        <option key={p.id} value={p.id}>{p.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Image Spécifique (Laisser vide pour utiliser l'image du produit)</label>
                  <ImageUpload
                    value={item.image_url}
                    onChange={(url) => handleSpaceItemChange(i, 'image_url', url)}
                    onUploading={() => {}}
                    folder="gallery"
                    requireSquare={false}
                  />
                </div>
              </div>
            ))}
            <button onClick={addSpaceItem} style={{ padding: '12px', background: '#F3F4F6', border: '1px dashed #D1D5DB', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
              + Ajouter une Card
            </button>
          </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '8px',
  border: '1px solid #E5E7EB',
  fontSize: '14px',
  outline: 'none',
  fontFamily: 'inherit'
};
