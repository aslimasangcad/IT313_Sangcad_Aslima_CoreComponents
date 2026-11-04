import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  Pressable,
  StyleSheet,
  StatusBar,
} from "react-native";

// STUDENT CARD COMPONENT
function StudentCard({
  id,
  name,
  year,
  photoUrl,
  flagged,
  onToggleFlag,
}) {
  return (
    <View style={styles.studentCard}>
      <Image
        source={{ uri: photoUrl }}
        style={styles.studentImage}
        accessibilityLabel={`${name}'s profile photo`}
      />

      <View style={styles.studentInfo}>
        <Text style={styles.studentName}>{name}</Text>
        <Text style={styles.studentYear}>{year}</Text>
      </View>

      <Pressable
        onPress={() => onToggleFlag(id)}
        style={({ pressed }) => [
          styles.flagButton,
          flagged
            ? styles.flaggedButton
            : styles.unflaggedButton,
          pressed && styles.pressedButton,
        ]}
      >
        <Text
          style={[
            styles.flagButtonText,
            flagged
              ? styles.flaggedButtonText
              : styles.unflaggedButtonText,
          ]}
        >
          {flagged ? "★ Flagged" : "☆ Flag"}
        </Text>
      </Pressable>
    </View>
  );
}

// STUDENT DIRECTORY COMPONENT
export default function StudentDirectory() {
  const [students, setStudents] = useState([
    {
      id: "s1",
      name: "Ana Cruz",
      year: "3rd Year",
      photoUrl: "https://i.pravatar.cc/100?img=1",
      flagged: false,
    },
    {
      id: "s2",
      name: "Bea Santos",
      year: "2nd Year",
      photoUrl: "https://i.pravatar.cc/100?img=2",
      flagged: false,
    },
    {
      id: "s3",
      name: "Cid Ramos",
      year: "4th Year",
      photoUrl: "https://i.pravatar.cc/100?img=3",
      flagged: false,
    },
    {
      id: "s4",
      name: "Dex Alonzo",
      year: "1st Year",
      photoUrl: "https://i.pravatar.cc/100?img=4",
      flagged: false,
    },
    {
      id: "s5",
      name: "Eli Tan",
      year: "3rd Year",
      photoUrl: "https://i.pravatar.cc/100?img=5",
      flagged: false,
    },
  ]);

  // SEARCH STATE
  const [query, setQuery] = useState("");

  // TOGGLE FLAG FUNCTION
  const toggleFlag = (studentId) => {
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === studentId
          ? {
              ...student,
              flagged: !student.flagged,
            }
          : student
      )
    );
  };

  // SEARCH FILTER
  const filteredStudents = students.filter((student) =>
    student.name
      .toLowerCase()
      .includes(query.trim().toLowerCase())
  );

  // COUNT FLAGGED STUDENTS
  const flaggedCount = students.filter(
    (student) => student.flagged
  ).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#211B55"
      />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Student Directory
        </Text>

        <Text style={styles.headerSubtitle}>
          {students.length} students this term
        </Text>
      </View>

      {/* MAIN CONTENT */}
      <View style={styles.content}>
        {/* SEARCH INPUT */}
        <TextInput
          style={styles.searchInput}
          placeholder="⌕ Search students..."
          placeholderTextColor="#88849A"
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
        />

        {/* STUDENT SUMMARY */}
        <View style={styles.summaryRow}>
          <Text style={styles.sectionTitle}>
            Students
          </Text>

          <Text style={styles.flaggedCount}>
            {flaggedCount} flagged for advising
          </Text>
        </View>

        {/* SCROLLABLE STUDENT LIST */}
        <ScrollView
          style={styles.studentList}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <StudentCard
                key={student.id}
                id={student.id}
                name={student.name}
                year={student.year}
                photoUrl={student.photoUrl}
                flagged={student.flagged}
                onToggleFlag={toggleFlag}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>
                No students found
              </Text>

              <Text style={styles.emptyMessage}>
                Try searching with another student name.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// STYLING
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F5FA",
  },

  header: {
    backgroundColor: "#211B55",
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 24,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "700",
    letterSpacing: 0.2,
  },

  headerSubtitle: {
    color: "#D8D4F0",
    fontSize: 13,
    marginTop: 5,
  },

  content: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 20,
  },

  searchInput: {
    height: 48,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E2EF",
    borderRadius: 13,
    paddingHorizontal: 15,
    fontSize: 14,
    color: "#24213A",
    marginBottom: 20,
  },

  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  sectionTitle: {
    color: "#24213A",
    fontSize: 17,
    fontWeight: "700",
  },

  flaggedCount: {
    color: "#77728D",
    fontSize: 11,
  },

  studentList: {
    flex: 1,
  },

  listContent: {
    paddingBottom: 24,
  },

  studentCard: {
    minHeight: 82,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#EAE8F1",
    padding: 12,
    marginBottom: 11,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#211B55",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  studentImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#E7E3F3",
  },

  studentInfo: {
    flex: 1,
    marginLeft: 12,
  },

  studentName: {
    color: "#24213A",
    fontSize: 15,
    fontWeight: "700",
  },

  studentYear: {
    color: "#858096",
    fontSize: 12,
    marginTop: 4,
  },

  flagButton: {
    minWidth: 82,
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  flaggedButton: {
    backgroundColor: "#E5A900",
    borderColor: "#E5A900",
  },

  unflaggedButton: {
    backgroundColor: "#FFFFFF",
    borderColor: "#D8D4E5",
  },

  pressedButton: {
    opacity: 0.7,
    transform: [{ scale: 0.96 }],
  },

  flagButtonText: {
    fontSize: 11,
    fontWeight: "700",
  },

  flaggedButtonText: {
    color: "#FFFFFF",
  },

  unflaggedButtonText: {
    color: "#77728D",
  },

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
  },

  emptyTitle: {
    color: "#24213A",
    fontSize: 17,
    fontWeight: "700",
  },

  emptyMessage: {
    color: "#858096",
    fontSize: 13,
    textAlign: "center",
    marginTop: 8,
  },
});