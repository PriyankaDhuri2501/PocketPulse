
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';


type WelcomeHeaderProps = {
  title: string;
  subtitle: string;
};

type ProgressCardProps = {
  progress: string;
  completed: number;
  total: number;
  onComplete: () => void;
  onReset: () => void;
};


function WelcomeHeader({ title, subtitle }: WelcomeHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>
        {subtitle}
      </Text>
  

    </View>
    
  
  );
}



function ProgressCard({ progress, completed, total, onComplete, onReset }: ProgressCardProps) {
  const progress1 = total > 0 ? Math.min(completed / total, 1) : 0;
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{progress}</Text>
      <Text style={styles.progress}>{completed} of {total} small steps</Text>
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${progress1 * 100}%` },
          ]}
        />
      </View>
      
      <Pressable
        style={[
          styles.completeButton,
          completed >= total && styles.disabledButton,
        ]}
        onPress={onComplete}
        disabled={completed >= total}
      >
        <Text style={styles.completeButtonText}>
          {completed >= total ? 'Goal completed!' : 'Complete one step'}
        </Text>
      </Pressable>
      <Pressable
      style ={[styles.resetButton]}
        onPress={onReset}>
        <Text style={styles.resetButtonText}>Reset Goal</Text>
      </Pressable>

    </View>
  );
}

export default function HomeScreen() {
  const [goals, setGoals] = useState([
    { title: 'Drink more water', completed: 3, total: 8 },
    { title: 'Exercise regularly', completed: 5, total: 10 },
    { title: 'Read daily', completed: 2, total: 7 },
    { title: 'Meditate', completed: 4, total: 6 },
    { title: 'Sleep early', completed: 1, total: 5 },
  
  ]);
  const [newGoalTitle, setNewGoalTitle] = useState('');


function completeGoal(title: string) {
  setGoals((currentGoals) =>
    currentGoals.map((goal) =>
      goal.title === title && goal.completed < goal.total
        ? { ...goal, completed: goal.completed + 1 }
        : goal
    )
  );
}


function resetGoal(title: string) {
  setGoals((currentGoals) =>
    currentGoals.map((goal) =>
      goal.title === title
        ? { ...goal, completed: 0 }
        : goal
    )
  );
}

function addGoal() {
  if (newGoalTitle.trim() === '') {
    return;
  }

  setGoals((currentGoals) => [
    ...currentGoals,
    {
      title: newGoalTitle.trim(),
      completed: 0,
      total: 5,
    },
  ]);

  setNewGoalTitle('');
}


  return (
    <View style={styles.container}>
      <WelcomeHeader title="PocketPulse" subtitle="Small steps. Real progress." />
      <TextInput
  placeholder="Enter a new goal"
  value={newGoalTitle}
  onChangeText={setNewGoalTitle}
  style={styles.goalInput}
/>
<Pressable style={styles.addGoalButton} onPress={addGoal}>
  <Text style={styles.addGoalButtonText}>Add Goal</Text>
</Pressable>
      
<ScrollView
  style={styles.goalsList}
  contentContainerStyle={styles.goalsContent}
  showsVerticalScrollIndicator={false}
>
  {goals.map((goal) => (
    <ProgressCard
      key={goal.title}
      progress={goal.title}
      completed={goal.completed}
      total={goal.total}
      onComplete={() => completeGoal(goal.title)}
      onReset={() => resetGoal(goal.title)}
    />
  ))}
</ScrollView>
  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F5F3FF',
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6D28D9',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: '#4B5563',
  },
  card: {
    width: '100%',
    marginTop: 32,
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
  },
  progress: {
    marginTop: 10,
    fontSize: 15,
    color: '#6D28D9',
  },

progressTrack: {
  height: 8,
  backgroundColor: '#E9D5FF',
  borderRadius: 999,
  marginTop: 14,
  overflow: 'hidden',
},
progressFill: {
  height: '100%',
  backgroundColor: '#7C3AED',
  borderRadius: 999,
},
goalsList: {
  width: '100%',
  marginTop: 8,
},
goalsContent: {
  paddingBottom: 24,
},

completeButton: {
  marginTop: 16,
  paddingVertical: 12,
  borderRadius: 10,
  backgroundColor: '#7C3AED',
  alignItems: 'center',
},
completeButtonText: {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: '600',
},

disabledButton: {
  backgroundColor: '#9CA3AF',
},

resetButton: {
  marginTop: 8,
  paddingVertical: 10,
  borderRadius: 10,
  alignItems: 'center',
  backgroundColor: '#F3F4F6',
},
resetButtonText: {
  color: '#374151',
  fontSize: 14,
  fontWeight: '600',
},
goalInput: {
  backgroundColor: '#FFFFFF',
  borderWidth: 1,
  borderColor: '#D1D5DB',
  borderRadius: 12,
  padding: 14,
  fontSize: 16,
  color: '#1F2937',
  marginBottom: 12,
},
addGoalButton: {
  backgroundColor: '#7C3AED',
  padding: 14,
  borderRadius: 12,
  alignItems: 'center',
  marginBottom: 20,
},
addGoalButtonText: {
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: '600',
},
});


