
import React, { useState } from "react";
import { X } from "lucide-react";
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FiltersSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FilterOption {
  id: string;
  label: string;
  selected: boolean;
}

const FiltersSheet: React.FC<FiltersSheetProps> = ({ open, onOpenChange }) => {
  // Distance filter
  const [distance, setDistance] = useState<number[]>([5]);
  
  // Accessibility filter
  const [isAccessible, setIsAccessible] = useState(false);
  
  // Price range
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  
  // Bedroom options
  const [bedroomOptions, setBedroomOptions] = useState<FilterOption[]>([
    { id: "any", label: "Any", selected: true },
    { id: "1", label: "1", selected: false },
    { id: "2", label: "2", selected: false },
    { id: "3", label: "3", selected: false },
    { id: "4", label: "4", selected: false },
    { id: "5+", label: "5+", selected: false }
  ]);
  
  // Bathroom options
  const [bathroomOptions, setBathroomOptions] = useState<FilterOption[]>([
    { id: "any", label: "Any", selected: true },
    { id: "0.0", label: "0.0", selected: false },
    { id: "1.0", label: "1.0", selected: false },
    { id: "1.5", label: "1.5", selected: false },
    { id: "2.0", label: "2.0", selected: false },
    { id: "2.5", label: "2.5", selected: false },
    { id: "3+", label: "3+", selected: false }
  ]);
  
  // Preference options
  const [preferenceOptions, setPreferenceOptions] = useState<FilterOption[]>([
    { id: "vegetarian", label: "Vegetarian", selected: false },
    { id: "non-vegetarian", label: "Non-Vegetarian", selected: false },
    { id: "immediately-available", label: "Immediately Available", selected: false },
    { id: "all-girls", label: "All Girls", selected: false },
    { id: "all-boys", label: "All Boys", selected: false },
    { id: "mixed-gender", label: "Mixed Gender", selected: false },
    { id: "student", label: "Student", selected: false },
    { id: "working", label: "Working", selected: false },
    { id: "pet", label: "I have a pet", selected: false },
    { id: "non-smoker", label: "Non-Smoker", selected: false },
    { id: "non-drinker", label: "Non-Drinker", selected: false }
  ]);

  const handleOptionSelect = (optionsList: FilterOption[], setOptions: React.Dispatch<React.SetStateAction<FilterOption[]>>, id: string) => {
    setOptions(optionsList.map(option => {
      // If it's "any" option, deselect all others when selected
      if (id === "any") {
        return { ...option, selected: option.id === "any" };
      }
      // If selecting a specific option, deselect "any"
      if (id !== "any" && option.id === "any") {
        return { ...option, selected: false };
      }
      // Toggle the selected option
      if (option.id === id) {
        return { ...option, selected: !option.selected };
      }
      return option;
    }));
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl px-4">
        <SheetHeader className="flex flex-row items-center justify-between border-b pb-4 mb-4">
          <SheetTitle className="text-2xl font-semibold text-center flex-1">Filters</SheetTitle>
          <SheetClose className="rounded-full p-1">
            <X className="h-6 w-6" />
          </SheetClose>
        </SheetHeader>

        <ScrollArea className="h-[calc(90vh-80px)] pr-4">
          <div className="flex flex-col space-y-8 pb-20">
            {/* Distance from NU */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Distance from NU</h3>
              <div className="px-1">
                <div className="flex justify-between mb-2">
                  <span>0</span>
                  <span>{distance[0]} Mile(s)</span>
                </div>
                <Slider 
                  defaultValue={[5]} 
                  max={10} 
                  step={1} 
                  value={distance}
                  onValueChange={setDistance}
                  className="mt-2"
                />
              </div>
            </div>

            {/* Red-eye Accessible */}
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Red-eye Accessible?</h3>
              <Switch 
                checked={isAccessible} 
                onCheckedChange={setIsAccessible} 
                className="data-[state=checked]:bg-red-500"
              />
            </div>

            {/* Price range */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Price range</h3>
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  type="number" 
                  placeholder="Min" 
                  value={minPrice} 
                  onChange={(e) => setMinPrice(e.target.value)} 
                  className="text-base rounded-lg"
                />
                <Input 
                  type="number" 
                  placeholder="Max" 
                  value={maxPrice} 
                  onChange={(e) => setMaxPrice(e.target.value)} 
                  className="text-base rounded-lg"
                />
              </div>
            </div>

            {/* Bedrooms */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Bedrooms</h3>
              <div className="flex flex-wrap gap-3">
                {bedroomOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(bedroomOptions, setBedroomOptions, option.id)}
                    className={`px-6 py-3 rounded-full text-sm ${
                      option.selected
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bathrooms */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Bathrooms</h3>
              <div className="flex flex-wrap gap-3">
                {bathroomOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(bathroomOptions, setBathroomOptions, option.id)}
                    className={`px-6 py-3 rounded-full text-sm ${
                      option.selected
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Preferences */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Preferences</h3>
              <div className="flex flex-wrap gap-3">
                {preferenceOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(preferenceOptions, setPreferenceOptions, option.id)}
                    className={`px-6 py-3 rounded-full text-sm ${
                      option.selected
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default FiltersSheet;
