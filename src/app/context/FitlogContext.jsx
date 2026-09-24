"use client";

import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const FitlogContext = createContext();

export const FitlogProvider = ({ children }) => {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedPlan = localStorage.getItem("fitlog-plan");
      const savedItems = localStorage.getItem("fitlog-saved");

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

  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [plan, saved, hydrated]);

  const addToPlan = (workout) => {
    if (plan.some((item) => item.id === workout.id)) {
      toast.error("Already in today's plan");
      return;
    }

    if (plan.length >= 5) {
      toast.error("Today's plan is full. Maximum 5 lifts.");
      return;
    }

    setPlan((prev) => [...prev, { ...workout, done: false }]);
    toast.success("Added to today's plan");
  };

  const saveForLater = (workout) => {
    if (saved.some((item) => item.id === workout.id)) {
      toast.error("Already saved");
      return;
    }

    setSaved((prev) => [...prev, workout]);
    toast.success("Saved for later");
  };

  const removeFromPlan = (id) => {
    setPlan((prev) => prev.filter((item) => item.id !== id));
    toast.success("Removed from today's plan");
  };

  const removeFromSaved = (id) => {
    setSaved((prev) => prev.filter((item) => item.id !== id));
    toast.success("Removed from saved");
  };

  const markAsDone = (id) => {
    setPlan((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );

    const workout = plan.find((item) => item.id === id);

    if (workout?.done) {
      toast("Marked as active");
    } else {
      toast.success("Workout marked as done");
    }
  };

  return (
    <FitlogContext.Provider
      value={{
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
};

export const useFitlog = () => {
  const context = useContext(FitlogContext);

  if (!context) {
    throw new Error("useFitlog must be used inside FitlogProvider");
  }

  return context;
};