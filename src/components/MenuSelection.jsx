import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MenuSelection = ({ onSubmit }) => {
  const [menuCount, setMenuCount] = useState(1);

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Menu Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="menuCount">How many menus do you want to create?</Label>
          <Input
            id="menuCount"
            type="number"
            min="1"
            max="10"
            value={menuCount}
            onChange={(e) => setMenuCount(parseInt(e.target.value) || 1)}
          />
        </div>
        <Button 
          className="w-full bg-teal-700 hover:bg-teal-800"
          onClick={() => onSubmit(menuCount)}
        >
          Continue
        </Button>
      </CardContent>
    </Card>
  );
};

export default MenuSelection;