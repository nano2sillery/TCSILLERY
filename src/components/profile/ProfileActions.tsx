import React from 'react';
import { Edit2, LogOut } from 'lucide-react';
import Button from '@/components/ui/Button';

interface ProfileActionsProps {
  isEditing: boolean;
  isDirty: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onLogout: () => void;
}

export default function ProfileActions({
  isEditing,
  isDirty,
  onEdit,
  onCancel,
  onLogout
}: ProfileActionsProps) {
  if (isEditing) {
    return (
      <>
        <Button 
          type="submit" 
          disabled={!isDirty}
          className="flex-1 bg-tertiary-500 hover:bg-tertiary-600"
        >
          Enregistrer
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
        >
          Annuler
        </Button>
      </>
    );
  }

  return (
    <>
      <Button
        type="button"
        onClick={onEdit}
        className="flex-1 bg-tertiary-500 hover:bg-tertiary-600 flex items-center justify-center"
      >
        <Edit2 className="w-4 h-4 mr-2" />
        Modifier le profil
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={onLogout}
        className="px-3 border-secondary-500 text-secondary-500 hover:bg-secondary-50"
      >
        <LogOut className="w-4 h-4" />
      </Button>
    </>
  );
}