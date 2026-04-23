import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// 🔐 Replace with your actual credentials
const supabaseUrl = "https://nkztgieyokknnrdfzshl.supabase.co/rest/v1/";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5renRnaWV5b2trbm5yZGZ6c2hsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5NDY3MDIsImV4cCI6MjA5MjUyMjcwMn0.wKO1WmHmKDYGQZ1UrTSw4sv8_JYDP2vjbBEBzse85zM";

const supabase = createClient(supabaseUrl, supabaseKey);

const form = document.getElementById("bookingForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    first_name: document.getElementById("firstName").value.trim(),
    last_name: document.getElementById("lastName").value.trim(),
    email: document.getElementById("email").value.trim(),
    service: document.getElementById("service").value,
    date: document.getElementById("date").value,
    time: document.getElementById("time").value,
    notes: document.getElementById("notes").value.trim(),
  };

  // Basic validation
  if (!data.first_name || !data.last_name || !data.email || !data.date) {
    alert("Please fill all required fields");
    return;
  }

  try {
    // Check if slot already exists
    const { data: existing, error: checkError } = await supabase
      .from("appointments")
      .select("*")
      .eq("date", data.date)
      .eq("time", data.time);

    if (checkError) throw checkError;

    if (existing.length > 0) {
      alert("This time slot is already booked. Please choose another.");
      return;
    }

    // Insert booking
    const { error } = await supabase
      .from("appointments")
      .insert([data]);

    if (error) throw error;

    alert("Booking request sent successfully. You will receive confirmation within 48 hours.");
    form.reset();

  } catch (err) {
    console.error(err);
    alert("Something went wrong. Please try again.");
  }
});
