import { Button } from "@/components/ui/button";
import React from "react";
import { IoSend } from "react-icons/io5";

function InfoSection({ trip }) {
  const user = trip?.userSelection;

  return (
    <div>
      <img
        src="/placeholde.jpg"
        alt="Destination"
        className="h-[340px] w-full object-cover rounded-lg"
      />

      <div className="flex justify-between items-center mt-5">
        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-3xl text-gray-800">
            📍 {user?.location?.label || "Location Unknown"}
          </h2>

          <div className="flex flex-wrap gap-4 text-sm">
            <span className="p-2 px-4 bg-gray-200 rounded-full">
              📅 {user?.noOfDays} {user?.noOfDays > 1 ? "Days" : "Day"}
            </span>
            <span className="p-2 px-4 bg-gray-200 rounded-full">
              💸 {user?.budget || "N/A"}
            </span>
            <span className="p-2 px-4 bg-gray-200 rounded-full">
              🧑 {user?.travelers || "1"} Traveler
            </span>
          </div>
        </div>

        <Button className="flex gap-2 items-center">
          Send <IoSend size={18} />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
