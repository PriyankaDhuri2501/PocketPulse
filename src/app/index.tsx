
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { styles } from '../styles';


type WelcomeHeaderProps = {
  title: string;
  subtitle: string;
};

type ProgressCardProps = {
  progress: string;
  completed: number;
  total: number;
  category: string;
  onComplete: () => void;
  onReset: () => void;
  onDelete: () => void;
  onEdit: () => void;


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


function ProgressCard({ progress, completed, total, category, onComplete, onReset, onDelete, onEdit}: ProgressCardProps) {
  const progress1 = total > 0 ? Math.min(completed / total, 1) : 0;
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{progress}</Text>
      <Text style={styles.progress}>{completed} of {total} small steps</Text>
      <Text style={styles.category}>{category}</Text>
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
    
    <Pressable 
    style={[styles.deleteButton]}
    onPress={onDelete}>
      <Text style={styles.deleteButtonText}>Delete Goal</Text>
    </Pressable>


<Pressable
  style={styles.editButton}
  onPress={onEdit}
>
  <Text style={styles.editButtonText}>Edit Goal</Text>
</Pressable>

    
    </View>
  );
}

export default function HomeScreen() {
  const [goals, setGoals] = useState([
    { id: '1', title: 'Drink more water', completed: 3, total: 8 },
    { id: '2', title: 'Exercise regularly', completed: 5, total: 10 },
  
  ]);

  const savedGoals = JSON.stringify(goals);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [newGoalCategory, setNewGoalCategory] = useState('Personal');

async function saveGoals(updatedGoals: typeof goals) {
  try {
    await AsyncStorage.setItem(
      'pocketpulse_goals',
      JSON.stringify(updatedGoals)
    );
  } catch (error) {
    console.log('Error saving goals:', error);
  }
}

function editGoal() {
  if (editedTitle.trim() === '') {
    return;
  }

  const updatedGoals = goals.map((goal) =>
      goal.id === editingGoalId
        ? { ...goal, title: editedTitle.trim() }
        : goal
    )
    setGoals(updatedGoals);
    saveGoals(updatedGoals);

    setEditingGoalId(null);
    setEditedTitle('');
}

async function loadGoals() {
  try {
    const savedGoals = await AsyncStorage.getItem(
      'pocketpulse_goals'
    );

    if (savedGoals !== null) {
      const parsedGoals = JSON.parse(savedGoals);

      const goalsWithIds = parsedGoals.map(
        (goal: any, index: number) => ({
          ...goal,
          id: goal.id ?? `${Date.now()}-${index}-${Math.random()}`,
        })
      );

      setGoals(goalsWithIds);
      await saveGoals(goalsWithIds);
    }
  } catch (error) {
    console.log('Error loading goals:', error);
  }
}



function completeGoal(id: string) {
  const updatedGoals = goals.map((goal) =>
      goal.id == id && goal.completed < goal.total
        ? { ...goal, completed: goal.completed + 1 }
        : goal
    )
    setGoals(updatedGoals);
    saveGoals(updatedGoals);

}


function resetGoal(id: string) {
  const updatedGoals = goals.map((goal) =>
      goal.id === id
        ? { ...goal, completed: 0 }
        : goal
    )
    setGoals(updatedGoals);
    saveGoals(updatedGoals);
}



function addGoal() {
  if (newGoalTitle.trim() === '') {
    return;
  }

  const updatedGoals = [
    ...goals,
    {
      id: `${Date.now()}-${Math.random()}`,
      title: newGoalTitle.trim(),
      completed: 0,
      total: 5,
      category: newGoalCategory,
    },
  ]
  setGoals(updatedGoals);
  saveGoals(updatedGoals);

}


function deleteGoal(id: string) {
  Alert.alert(
    'Delete Goal',
    `Are you sure you want to delete this goal?`,
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          const updatedGoals = goals.filter((goal) => goal.id !== id);
          setGoals(updatedGoals);
          saveGoals(updatedGoals);
        },
      },
    ]
  );
}

useEffect(() => {
  loadGoals();
}, []);


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

<View style={styles.categorySelector}>
  {['Health', 'Learning', 'Personal'].map((category) => (
    <Pressable
      key={category}
      style={[
        styles.categoryOption,
        newGoalCategory === category && styles.selectedCategory,
      ]}
      onPress={() => setNewGoalCategory(category)}
    >
      <Text
        style={[
          styles.categoryOptionText,
          newGoalCategory === category && styles.selectedCategoryText,
        ]}
      >
        {category}
      </Text>
    </Pressable>
  ))}
</View>


{editingGoalId !== null && (
  <View>
    <Text style={styles.editingLabel}>Editing Goal</Text>
    <TextInput
      placeholder="Enter the new goal title"
      value={editedTitle}
      onChangeText={setEditedTitle}
      style={styles.goalInput}
    />

    <Pressable
      style={styles.addGoalButton}
      onPress={editGoal}
    >
      <Text style={styles.addGoalButtonText}>
        Save Changes
      </Text>
    </Pressable>

<Pressable
  style={styles.resetButton}
  onPress={() => {
    setEditingGoalId(null);
    setEditedTitle('');
  }}
>
  <Text style={styles.resetButtonText}>Cancel</Text>
</Pressable>

  </View>
)}



      



<ScrollView
  style={styles.goalsList}
  contentContainerStyle={styles.goalsContent}
  showsVerticalScrollIndicator={false}
>
  {goals.map((goal) => (
    <ProgressCard
      key={goal.id}
      progress={goal.title}
      completed={goal.completed}
      total={goal.total}
      category={goal.category ?? 'Personal'}
      onComplete={() => completeGoal(goal.id)}
      onReset={() => resetGoal(goal.id)}
      onDelete={() => deleteGoal(goal.id)}
      onEdit={() => {
  setEditingGoalId(goal.id);
  setEditedTitle(goal.title);
}}
    />
  ))}
</ScrollView>
  
    </View>
  );
}

