import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'wedding.db');

let db: Database.Database;

function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    initSchema(db);
  }
  return db;
}

function initSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS wedding_info (
      id INTEGER PRIMARY KEY,
      couple_names TEXT NOT NULL DEFAULT 'Thushan & Dharshi',
      ceremony_date TEXT NOT NULL DEFAULT '2026-07-01',
      ceremony_time TEXT NOT NULL DEFAULT '10:00 AM',
      ceremony_venue TEXT NOT NULL DEFAULT 'TBD',
      ceremony_address TEXT NOT NULL DEFAULT '',
      reception_date TEXT NOT NULL DEFAULT '2026-07-03',
      reception_time TEXT NOT NULL DEFAULT '6:00 PM',
      reception_venue TEXT NOT NULL DEFAULT 'TBD',
      reception_address TEXT NOT NULL DEFAULT '',
      welcome_message TEXT NOT NULL DEFAULT 'Join us as we begin our journey together',
      hashtag TEXT NOT NULL DEFAULT '#ThushanWedsDharshi',
      rsvp_deadline TEXT NOT NULL DEFAULT '2026-05-01',
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS rsvp (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      attending_ceremony INTEGER DEFAULT 1,
      attending_reception INTEGER DEFAULT 1,
      guest_count INTEGER DEFAULT 1,
      dietary TEXT,
      message TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS gallery (
      id INTEGER PRIMARY KEY,
      title TEXT,
      description TEXT,
      url TEXT NOT NULL,
      category TEXT DEFAULT 'memory',
      sort_order INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS family_members (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      relation TEXT NOT NULL,
      side TEXT NOT NULL CHECK(side IN ('groom','bride')),
      parent_id INTEGER,
      photo_url TEXT,
      description TEXT,
      sort_order INTEGER DEFAULT 0
    );
  `);

  const info = db.prepare('SELECT id FROM wedding_info LIMIT 1').get();
  if (!info) {
    db.prepare(`
      INSERT INTO wedding_info (couple_names, ceremony_date, ceremony_time, ceremony_venue, ceremony_address, reception_date, reception_time, reception_venue, reception_address, welcome_message, hashtag, rsvp_deadline)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      'Thushan & Dharshi',
      '2026-07-01',
      '10:00 AM',
      'Hindu Temple',
      'Address to be confirmed',
      '2026-07-03',
      '6:00 PM',
      'Reception Venue',
      'Address to be confirmed',
      'Two hearts, one beautiful journey. Join us as we celebrate love, family, and new beginnings.',
      '#ThushanWedsDharshi',
      '2026-05-15'
    );
  }

  seedFamilyTree(db);
}

function seedFamilyTree(db: Database.Database) {
  const existing = db.prepare('SELECT id FROM family_members LIMIT 1').get();
  if (existing) return;

  const members = [
    { name: 'Thushan', relation: 'Groom', side: 'groom', parent_id: null, sort_order: 0 },
    { name: 'Dharshi', relation: 'Bride', side: 'bride', parent_id: null, sort_order: 0 },
    { name: "Thushan's Father", relation: 'Father of Groom', side: 'groom', parent_id: null, sort_order: 1 },
    { name: "Thushan's Mother", relation: 'Mother of Groom', side: 'groom', parent_id: null, sort_order: 2 },
    { name: "Dharshi's Father", relation: 'Father of Bride', side: 'bride', parent_id: null, sort_order: 1 },
    { name: "Dharshi's Mother", relation: 'Mother of Bride', side: 'bride', parent_id: null, sort_order: 2 },
  ];

  const insert = db.prepare(`
    INSERT INTO family_members (name, relation, side, parent_id, sort_order)
    VALUES (@name, @relation, @side, @parent_id, @sort_order)
  `);
  for (const m of members) insert.run(m);
}

export function getWeddingInfo() {
  return getDb().prepare('SELECT * FROM wedding_info LIMIT 1').get() as WeddingInfo;
}

export function updateWeddingInfo(data: Partial<WeddingInfo>) {
  const fields = Object.keys(data).map(k => `${k} = @${k}`).join(', ');
  getDb().prepare(`UPDATE wedding_info SET ${fields}, updated_at = datetime('now') WHERE id = 1`).run(data);
}

export function getRsvps() {
  return getDb().prepare('SELECT * FROM rsvp ORDER BY created_at DESC').all();
}

export function insertRsvp(data: Omit<RsvpEntry, 'id' | 'created_at'>) {
  return getDb().prepare(`
    INSERT INTO rsvp (name, email, phone, attending_ceremony, attending_reception, guest_count, dietary, message)
    VALUES (@name, @email, @phone, @attending_ceremony, @attending_reception, @guest_count, @dietary, @message)
  `).run(data);
}

export function getGallery() {
  return getDb().prepare('SELECT * FROM gallery ORDER BY sort_order ASC, created_at DESC').all();
}

export function addGalleryItem(data: Omit<GalleryItem, 'id' | 'created_at'>) {
  return getDb().prepare(`
    INSERT INTO gallery (title, description, url, category, sort_order)
    VALUES (@title, @description, @url, @category, @sort_order)
  `).run(data);
}

export function deleteGalleryItem(id: number) {
  return getDb().prepare('DELETE FROM gallery WHERE id = ?').run(id);
}

export function getFamilyMembers() {
  return getDb().prepare('SELECT * FROM family_members ORDER BY side, sort_order').all();
}

export function getAdmin(email: string) {
  return getDb().prepare('SELECT * FROM admins WHERE email = ?').get(email) as AdminUser | undefined;
}

export function createAdmin(email: string, passwordHash: string) {
  return getDb().prepare('INSERT INTO admins (email, password_hash) VALUES (?, ?)').run(email, passwordHash);
}

export function updateFamilyMember(id: number, data: Partial<FamilyMember>) {
  const fields = Object.keys(data).map(k => `${k} = @${k}`).join(', ');
  getDb().prepare(`UPDATE family_members SET ${fields} WHERE id = @id`).run({ ...data, id });
}

export function addFamilyMember(data: Omit<FamilyMember, 'id'>) {
  return getDb().prepare(`
    INSERT INTO family_members (name, relation, side, parent_id, photo_url, description, sort_order)
    VALUES (@name, @relation, @side, @parent_id, @photo_url, @description, @sort_order)
  `).run(data);
}

export function deleteFamilyMember(id: number) {
  return getDb().prepare('DELETE FROM family_members WHERE id = ?').run(id);
}

export interface WeddingInfo {
  id: number;
  couple_names: string;
  ceremony_date: string;
  ceremony_time: string;
  ceremony_venue: string;
  ceremony_address: string;
  reception_date: string;
  reception_time: string;
  reception_venue: string;
  reception_address: string;
  welcome_message: string;
  hashtag: string;
  rsvp_deadline: string;
  updated_at: string;
}

export interface RsvpEntry {
  id: number;
  name: string;
  email: string;
  phone: string;
  attending_ceremony: number;
  attending_reception: number;
  guest_count: number;
  dietary: string;
  message: string;
  created_at: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  description: string;
  url: string;
  category: string;
  sort_order: number;
  created_at: string;
}

export interface FamilyMember {
  id: number;
  name: string;
  relation: string;
  side: 'groom' | 'bride';
  parent_id: number | null;
  photo_url: string | null;
  description: string | null;
  sort_order: number;
}

export interface AdminUser {
  id: number;
  email: string;
  password_hash: string;
}
