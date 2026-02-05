-- Schema SQL pour la base de données Supabase
-- Exécute ce script dans l'éditeur SQL de Supabase (SQL Editor)

-- Table des profils utilisateurs
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activer RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Politique: les utilisateurs peuvent voir leur propre profil
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Politique: les utilisateurs peuvent mettre à jour leur propre profil
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Politique: insertion automatique lors de l'inscription
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Table de progression des cours
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id TEXT NOT NULL,
  chapter_id TEXT NOT NULL,
  section_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course_id, chapter_id, section_id)
);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress" ON user_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON user_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Table des résultats d'exercices
CREATE TABLE IF NOT EXISTS exercise_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id TEXT NOT NULL,
  chapter_id TEXT NOT NULL,
  section_id TEXT NOT NULL,
  exercise_id TEXT NOT NULL,
  score INTEGER NOT NULL,
  max_score INTEGER NOT NULL,
  attempts INTEGER DEFAULT 1,
  last_attempt TIMESTAMPTZ DEFAULT NOW(),
  answers JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course_id, exercise_id)
);

ALTER TABLE exercise_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own exercise results" ON exercise_results
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own exercise results" ON exercise_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own exercise results" ON exercise_results
  FOR UPDATE USING (auth.uid() = user_id);

-- Table pour les sessions de révision
CREATE TABLE IF NOT EXISTS revision_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id TEXT NOT NULL,
  exercises_reviewed JSONB DEFAULT '[]',
  score INTEGER DEFAULT 0,
  total_exercises INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

ALTER TABLE revision_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own revision sessions" ON revision_sessions
  FOR ALL USING (auth.uid() = user_id);

-- Fonction pour créer automatiquement un profil lors de l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour créer le profil automatiquement
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_course_id ON user_progress(course_id);
CREATE INDEX IF NOT EXISTS idx_exercise_results_user_id ON exercise_results(user_id);
CREATE INDEX IF NOT EXISTS idx_exercise_results_course_id ON exercise_results(course_id);
