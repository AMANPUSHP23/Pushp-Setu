import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const FamilyMemberModal = ({ open, onOpenChange, onAdd }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    onAdd(name.trim());
    setName('');
    setError('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Family Member</DialogTitle>
          <DialogDescription>Enter the name of the new family member.</DialogDescription>
        </DialogHeader>
        <Input
          placeholder="e.g., Alice"
          value={name}
          onChange={e => setName(e.target.value)}
          className="mb-2"
        />
        {error && <div className="text-red-500 text-xs mb-2">{error}</div>}
        <Button onClick={handleAdd} className="w-full">Add Member</Button>
      </DialogContent>
    </Dialog>
  );
};

export default FamilyMemberModal; 