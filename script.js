import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// 🔐 Replace with your actual credentials
const supabaseUrl = "https://nkztgieyokknnrdfzshl.supabase.co/rest/v1/";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5renRnaWV5b2trbm5yZGZ6c2hsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5NDY3MDIsImV4cCI6MjA5MjUyMjcwMn0.wKO1WmHmKDYGQZ1UrTSw4sv8_JYDP2vjbBEBzse85zM";

const supabase = createClient(supabaseUrl, supabaseKey);

const form = document.getElementById("bookingForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("Form submitted");

  const data = {
    first_name: document.getElementById("firstName").value,
    last_name: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    service: document.getElementById("service").value,
    date: document.getElementById("date").value,
    time: document.getElementById("time").value,
    notes: document.getElementById("notes").value,
  };

  console.log("DATA:", data);

  const { data: result, error } = await supabase
    .from("appointments")
    .insert([data]);

  console.log("RESULT:", result);
  console.log("ERROR:", error);
});
