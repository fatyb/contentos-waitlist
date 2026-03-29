"use server";

import { supabase } from "@/lib/supabase";

/**
 * Server Action — insert an email into the `waitlist` table.
 *
 * Expected Supabase table schema:
 *   CREATE TABLE waitlist (
 *     id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 *     email      text UNIQUE NOT NULL,
 *     created_at timestamptz NOT NULL DEFAULT now()
 *   );
 */
export async function joinWaitlist(formData) {
  const email = formData.get("email")?.toString().trim().toLowerCase();

  if (!email) {
    return { success: false, message: "Please enter a valid email address." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: "That email doesn't look right. Please check it." };
  }

  const { error } = await supabase
    .from("waitlist")
    .insert([{ email }]);

  if (error) {
    if (error.code === "23505") {
      return {
        success: false,
        message: "You're already on the waitlist! We'll see you at launch.",
      };
    }
    console.error("[joinWaitlist] Supabase error:", error.message);
    return {
      success: false,
      message: "Something went wrong. Please try again in a moment.",
    };
  }

  return {
    success: true,
    message: "🎉 You're on the list! Check your inbox for confirmation.",
  };
}
