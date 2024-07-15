'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { User } from '@/types/users';

export const signIn = async (data: { email: string; password: string }) => {
  const { email, password } = data;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return redirect('/login?message=Could not authenticate user');
  }

  return redirect('/');
};

export const signUp = async (data: User) => {
  const {
    email,
    firstName,
    lastName,
    password,
    height,
    weight,
    age,
    sex,
    howActive,
    goal
  } = data;

  const origin = headers().get('origin');
  const supabase = createClient();

  try {
    const { data: user, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`
      }
    });
    if (signUpError) {
      throw signUpError;
    }
    const { data: userData, error: insertError } = await supabase
      .from('users')
      .insert({
        email,
        first_name: firstName,
        last_name: lastName,
        height,
        weight,
        age,
        sex,
        how_active: howActive,
        goal
      })
      .select();

    if (insertError && user.user) {
      // Rollback signup if inserting into users table fails
      await supabase.auth.admin.deleteUser(user.user?.id);
      throw insertError;
    }
    return redirect('/?message=Check email to continue sign in process');
  } catch (error) {
    return redirect('/signup?message=Could not authenticate user');
  }
};

export const signOut = async () => {
  try {
    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect('/');
  } catch (error) {
    return redirect('/?message=Could not logout');
  }
};

export const searchIngredients = async (query: string) => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('foods')
      .select()
      .limit(5)
      .ilike('name', `%${query}%`);
    if (error) throw error;
    return data;
  } catch (error) {
    return null;
  }
};
