"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

const FitlogContext = createContext(null);

const API_URL =
  "https://api.api-store.workers.dev/api/fitlog";

export function FitlogProvider({ children }) {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);

  const [hydrated, setHydrated] = useState(false);

  /* =========================
     FETCH WORKOUTS FROM API
  ========================== */

  useEffect(() => {
    async function loadWorkouts() {
      try {
        setLoading(true);

        const res = await fetch(API_URL);

        if (!res.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data = await res.json();

        let items = [];

        if (Array.isArray(data)) {
          items = data;
        } else if (Array.isArray(data.workouts)) {
          items = data.workouts;
        } else if (Array.isArray(data.data)) {
          items = data.data;
        }

        setWorkouts(items);
      } catch (error) {
        console.error("Workout API error:", error);
        setWorkouts([]);
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  /* =========================
     LOAD LOCAL STORAGE
  ========================== */

  useEffect(() => {
    try {
      const savedPlan =
        localStorage.getItem("fitlog-plan");

      const savedItems =
        localStorage.getItem("fitlog-saved");

      if (savedPlan) {
        setPlan(JSON.parse(savedPlan));
      }

      if (savedItems) {
        setSaved(JSON.parse(savedItems));
      }
    } catch (error) {
      console.error("Local storage error:", error);
    } finally {
      setHydrated(true);
    }
  }, []);

  /* =========================
     SAVE LOCAL STORAGE
  ========================== */

  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(plan)
    );

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(saved)
    );
  }, [plan, saved, hydrated]);

  /* =========================
     ADD TO PLAN
  ========================== */

  const addToPlan = (workout) => {
    if (!workout) return;

    if (
      plan.some(
        (item) =>
          String(item.id) === String(workout.id)
      )
    ) {
      toast.error("Already in today's plan");
      return;
    }

    if (plan.length >= 5) {
      toast.error(
        "Today's plan is full. Maximum 5 lifts."
      );
      return;
    }

    setPlan((prev) => [
      ...prev,
      {
        ...workout,
        done: false,
      },
    ]);

    toast.success("Added to today's plan");
  };

  /* =========================
     SAVE FOR LATER
  ========================== */

  const saveForLater = (workout) => {
    if (!workout) return;

    if (
      saved.some(
        (item) =>
          String(item.id) === String(workout.id)
      )
    ) {
      toast.error("Already saved");
      return;
    }

    setSaved((prev) => [
      ...prev,
      workout,
    ]);

    toast.success("Saved for later");
  };

  

  const removeFromPlan = (id) => {
    setPlan((prev) =>
      prev.filter(
        (item) =>
          String(item.id) !== String(id)
      )
    );

    toast.success("Removed from today's plan");
  };


  const removeFromSaved = (id) => {
    setSaved((prev) =>
      prev.filter(
        (item) =>
          String(item.id) !== String(id)
      )
    );

    toast.success("Removed from saved");
  };

  /* =========================
     MARK DONE
  ========================== */

  const markAsDone = (id) => {
    setPlan((prev) =>
      prev.map((item) =>
        String(item.id) === String(id)
          ? {
              ...item,
              done: !item.done,
            }
          : item
      )
    );

    const workout = plan.find(
      (item) =>
        String(item.id) === String(id)
    );

    if (workout?.done) {
      toast("Marked as active");
    } else {
      toast.success("Workout marked as done");
    }
  };

  return (
    <FitlogContext.Provider
      value={{
        workouts,
        loading,
        plan,
        saved,
        hydrated,
        addToPlan,
        saveForLater,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
      }}
    >
      {children}
    </FitlogContext.Provider>
  );
}

export function useFitlog() {
  const context = useContext(FitlogContext);

  if (!context) {
    throw new Error(
      "useFitlog must be used inside FitlogProvider"
    );
  }

  return context;
}