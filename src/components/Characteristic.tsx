'use client';

import { OctagonX } from 'lucide-react';
import { ChatbotCharacteristic } from '../../types/types';
import { useMutation } from '@apollo/client';
import { REMOVE_CHARACTERISTIC } from '../../graphql/mutations/mutations';
import { toast } from 'sonner';

function Characteristic({
  characteristic,
}: {
  characteristic: ChatbotCharacteristic;
}) {
  const [removeCharacteristic] = useMutation(REMOVE_CHARACTERISTIC, {
    refetchQueries: ['GetChatbotById'],
  });

  const handleRemoveCharacteristic = async (characteristicId: number) => {
    try {
      await removeCharacteristic({
        variables: {
          id: characteristicId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className="relative p-10 bg-white border rounded-md">
      {characteristic.content}

      <OctagonX
        className="h-6 w-6 text-white fill-red-500 absolute top-1 right-1 cursor-pointer hover:opacity-50"
        onClick={() => {
          const promise = handleRemoveCharacteristic(characteristic.id);
          toast.promise(promise, {
            loading: 'Removing...',
            success: 'Characteristic Removed',
            error: 'Error removing characteristic',
          });
        }}
      />
    </li>
  );
}

export default Characteristic;
