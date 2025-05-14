import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import useAppStore from '@/stores/appStore';

const rewardsList = [
  { id: 1, name: 'Movie Night Coupon', points: 100, icon: '🎬' },
  { id: 2, name: 'Ice Cream Treat', points: 50, icon: '🍦' },
  { id: 3, name: 'Extra Screen Time', points: 75, icon: '🕹️' },
];

const RewardHistory = ({ history }) => (
  <div className="mt-6">
    <h4 className="font-semibold mb-2 text-sm text-muted-foreground">Redemption History</h4>
    {history.length === 0 ? (
      <p className="text-xs text-muted-foreground">No rewards redeemed yet.</p>
    ) : (
      <ul className="space-y-1 text-xs">
        {history.map((r, i) => (
          <li key={i} className="flex justify-between">
            <span>{r.icon} {r.name}</span>
            <span className="text-muted-foreground">{new Date(r.redeemedAt).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    )}
  </div>
);

const RedeemRewardsModal = ({ open, onOpenChange, assignedTo }) => {
  const { chores, rewardHistory, redeemReward } = useAppStore();
  // Filter for this person
  const memberChores = assignedTo ? chores.filter(c => c.assignedTo === assignedTo) : chores;
  const memberRewardHistory = assignedTo ? rewardHistory.filter(r => r.assignedTo === assignedTo) : rewardHistory;
  const availablePoints = React.useMemo(() => {
    const completedPoints = memberChores.filter(c => c.status === 'completed').reduce((sum, c) => sum + (c.points || 0), 0);
    const spent = memberRewardHistory.reduce((sum, r) => sum + r.points, 0);
    return Math.max(completedPoints - spent, 0);
  }, [memberChores, memberRewardHistory]);
  const [selected, setSelected] = React.useState(null);
  const [message, setMessage] = React.useState('');

  const handleRedeem = () => {
    if (selected && availablePoints >= selected.points) {
      redeemReward({ ...selected, assignedTo });
      setMessage(`You have redeemed: ${selected.icon} ${selected.name}!`);
    } else {
      setMessage('Not enough points to redeem this reward.');
    }
  };

  React.useEffect(() => {
    if (!open) {
      setSelected(null);
      setMessage('');
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Redeem Rewards</DialogTitle>
          <DialogDescription>
            Use your points to redeem fun rewards!
          </DialogDescription>
        </DialogHeader>
        <div className="mb-4">
          <p className="font-semibold">Total Points: <span className="text-primary">{availablePoints}</span></p>
        </div>
        <div className="space-y-2 mb-4">
          {rewardsList.map(reward => (
            <Button
              key={reward.id}
              variant={selected && selected.id === reward.id ? 'default' : 'outline'}
              className="w-full flex justify-between items-center"
              onClick={() => setSelected(reward)}
              disabled={availablePoints < reward.points}
            >
              <span className="flex items-center gap-2 text-lg">{reward.icon} <span className="text-base font-medium">{reward.name}</span></span>
              <span className="text-xs">{reward.points} pts</span>
            </Button>
          ))}
        </div>
        <Button onClick={handleRedeem} disabled={!selected || availablePoints < (selected?.points || 0)} className="w-full mb-2">
          Redeem Selected
        </Button>
        {message && <div className="text-center text-sm text-green-600 mt-2">{message}</div>}
        <RewardHistory history={memberRewardHistory} />
      </DialogContent>
    </Dialog>
  );
};

export default RedeemRewardsModal; 