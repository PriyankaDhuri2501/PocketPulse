
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
deleteButton: {
  marginTop: 8,
  paddingVertical: 10,
  borderRadius: 10,
  alignItems: 'center',
  backgroundColor: '#EF4444',
},
deleteButtonText: {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: '600',
},
editButton: {
  backgroundColor: '#F59E0B',
  marginTop: 8,
  padding: 10,
  borderRadius: 12,
  alignItems: 'center',

},
editButtonText: {
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: '600',
},
editingLabel: {
  fontSize: 16,
  fontWeight: '600',
  color: '#6D28D9',
  marginBottom: 8,
},
});




