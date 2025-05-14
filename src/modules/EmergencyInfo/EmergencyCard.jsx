
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User, Droplet, AlertTriangle, Pill, Phone } from 'lucide-react';

// This component would be used to display a printable/exportable emergency card.
const EmergencyCard = ({ profile }) => {
  if (!profile) return null;

  return (
    <Card className="w-[350px] shadow-lg rounded-lg border-2 border-red-500 p-0">
      <CardHeader className="bg-red-500 text-white p-3 rounded-t-md">
        <div className="flex items-center gap-2">
          <AlertTriangle size={24} />
          <CardTitle className="text-xl font-bold">EMERGENCY INFO</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <User size={16} className="text-muted-foreground" />
          <div>
            <p className="font-semibold text-lg">{profile.name}</p>
            <p className="text-xs text-muted-foreground">DOB: {profile.dob}</p>
          </div>
        </div>
        <hr className="my-1" />
        <p><strong className="inline-flex items-center gap-1"><Droplet size={14}/>Blood Type:</strong> {profile.bloodType}</p>
        <p><strong className="inline-flex items-center gap-1"><AlertTriangle size={14} className="text-red-600"/>Allergies:</strong> {profile.allergies || "None"}</p>
        <p><strong className="inline-flex items-center gap-1"><Pill size={14}/>Medications:</strong> {profile.medications || "None"}</p>
        <hr className="my-1" />
        <p className="font-semibold">Emergency Contact:</p>
        <p><strong className="inline-flex items-center gap-1"><User size={14}/>Name:</strong> {profile.emergencyContactName}</p>
        <p><strong className="inline-flex items-center gap-1"><Phone size={14}/>Phone:</strong> {profile.emergencyContactPhone}</p>
      </CardContent>
    </Card>
  );
};

export default EmergencyCard;
  