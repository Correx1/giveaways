/* eslint-disable @typescript-eslint/no-explicit-any */
// components/SettingsPanel.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

export function SettingsPanel({
  settings,
  onSave,
}: {
  settings: any;
  onSave: (newSettings: any) => void;
}) {
  const [logo, setLogo] = useState(settings.logo);
  const [winRatio, setWinRatio] = useState(settings.winRatio);
  const [tryAgainAction, setTryAgainAction] = useState(settings.tryAgainAction);

  const handleSave = () => {
    onSave({ logo, winRatio, tryAgainAction });
  };

  return (
    <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-green-900">Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Logo URL</Label>
          <Input
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
            placeholder="Enter logo URL"
          />
        </div>
        <div className="space-y-2">
          <Label>Win Ratio (%)</Label>
          <Input
            type="number"
            value={winRatio}
            onChange={(e) => setWinRatio(Number(e.target.value))}
            placeholder="Enter win ratio"
          />
        </div>
        <div className="space-y-2">
          <Label>Allow Try Again</Label>
          <Switch
            checked={tryAgainAction}
            onCheckedChange={setTryAgainAction}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSave}>Save</Button>
      </CardFooter>
    </Card>
  );
}