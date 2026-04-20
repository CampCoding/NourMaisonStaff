import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ─── Theme ───────────────────────────────────────────────────────────────────
const colors = {
  primary: '#dd9933',
  primaryLight: '#f5c870',
  primaryDark: '#b87a1f',
  secondary: '#84b067',
  secondaryLight: '#b4d7af',
  secondaryDark: '#5a8843',
  bg: '#faf7f2',
  surface: '#ffffff',
  surface2: '#f3ede3',
  text: '#2c2218',
  textMuted: '#8a7560',
  border: 'rgba(221,153,51,0.18)',
};

// ─── Types ────────────────────────────────────────────────────────────────────
interface TimeCardProps {
  icon: string;
  label: string;
  value: string;
  sub: string;
  barColor: string;
}

interface TimelineItemProps {
  time: string;
  type: 'work' | 'break' | 'end';
  title: string;
  description: string;
  duration: string;
  isLast?: boolean;
}

interface CalendarDayProps {
  day: number | null;
  isToday?: boolean;
  isOff?: boolean;
  isWork?: boolean;
  hasBreak?: boolean;
  isPast?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const WORK_DAYS = [
  1, 2, 3, 6, 7, 8, 9, 10, 13, 14, 15, 16, 17, 20, 21, 22, 23, 24, 27, 28, 29,
  30,
];
const OFF_DAYS = [4, 5, 11, 12, 18, 19, 25, 26];
const TODAY = 20;
const FIRST_DAY_OF_WEEK = 3; // Wednesday (0=Sun)
const TOTAL_DAYS = 30;

const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const timelineData: Omit<TimelineItemProps, 'isLast'>[] = [
  {
    time: '08:00',
    type: 'work',
    title: 'Work Shift',
    description: 'Morning Prep & Breakfast Service',
    duration: '4h · 08:00 – 12:00',
  },
  {
    time: '12:00',
    type: 'break',
    title: 'Break',
    description: 'Lunch Break',
    duration: '1h · 12:00 – 13:00',
  },
  {
    time: '13:00',
    type: 'work',
    title: 'Work Shift',
    description: 'Lunch & Evening Service',
    duration: '3h 30m · 13:00 – 16:30',
  },
  {
    time: '16:30',
    type: 'end',
    title: 'End of Shift',
    description: 'Handoff & Cleanup',
    duration: 'Shift complete',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const TimeCard: React.FC<TimeCardProps> = ({
  icon,
  label,
  value,
  sub,
  barColor,
}) => (
  <View style={styles.timeCard}>
    <View style={[styles.timeCardIcon, { backgroundColor: barColor + '22' }]}>
      <Text style={styles.timeCardIconText}>{icon}</Text>
    </View>
    <Text style={styles.timeCardLabel}>{label}</Text>
    <Text style={styles.timeCardValue}>{value}</Text>
    <Text style={styles.timeCardSub}>{sub}</Text>
    <View style={[styles.accentBar, { backgroundColor: barColor }]} />
  </View>
);

const CalendarDay: React.FC<CalendarDayProps> = ({
  day,
  isToday,
  isOff,
  isWork,
  hasBreak,
  isPast,
}) => {
  if (day === null) {
    return <View style={styles.calDayEmpty} />;
  }

  return (
    <View
      style={[
        styles.calDay,
        isToday && styles.calDayToday,
        !isToday && isWork && !isOff && styles.calDayWork,
        isPast && !isToday && styles.calDayPast,
      ]}
    >
      <Text
        style={[
          styles.calDayText,
          isToday && styles.calDayTextToday,
          isOff && !isToday && styles.calDayTextOff,
        ]}
      >
        {day}
      </Text>
      {!isToday && !isOff && (isWork || hasBreak) && (
        <View style={styles.calDots}>
          {isWork && <View style={[styles.calDot, styles.dotWork]} />}
          {hasBreak && <View style={[styles.calDot, styles.dotBreak]} />}
        </View>
      )}
    </View>
  );
};

const TimelineItem: React.FC<TimelineItemProps> = ({
  time,
  type,
  title,
  description,
  duration,
  isLast,
}) => {
  const dotColor =
    type === 'work'
      ? colors.primary
      : type === 'break'
      ? colors.secondary
      : colors.secondaryLight;

  const titleColor =
    type === 'work'
      ? colors.primaryDark
      : type === 'break'
      ? colors.secondaryDark
      : colors.secondaryDark;

  return (
    <View style={styles.timelineItem}>
      <Text style={styles.tlTime}>{time}</Text>
      <View style={styles.tlBarWrap}>
        <View style={[styles.tlDot, { backgroundColor: dotColor }]} />
        {!isLast && <View style={styles.tlLine} />}
      </View>
      <View style={styles.tlContent}>
        <Text style={[styles.tlType, { color: titleColor }]}>{title}</Text>
        <Text style={styles.tlDesc}>{description}</Text>
        <Text style={styles.tlDuration}>{duration}</Text>
      </View>
    </View>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────

const HomeScreen: React.FC = () => {
  const [activeNav, setActiveNav] = useState<
    'home' | 'schedule' | 'team' | 'profile'
  >('home');

  // Build calendar grid
  const calendarCells: (number | null)[] = [];
  for (let i = 0; i < FIRST_DAY_OF_WEEK; i++) calendarCells.push(null);
  for (let d = 1; d <= TOTAL_DAYS; d++) calendarCells.push(d);
  // Pad to complete last row
  while (calendarCells.length % 7 !== 0) calendarCells.push(null);

  const navItems: { key: typeof activeNav; icon: string; label: string }[] = [
    { key: 'home', icon: '🏠', label: 'Home' },
    { key: 'schedule', icon: '📅', label: 'Schedule' },
    { key: 'team', icon: '👥', label: 'Team' },
    { key: 'profile', icon: '👤', label: 'Profile' },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <View style={styles.root}>
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <View style={styles.header}>
          {/* Decorative circles */}
          <View style={styles.decCircle1} />
          <View style={styles.decCircle2} />

          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Good morning 👋</Text>
              <Text style={styles.headerName}>Marco's Kitchen</Text>
            </View>
            <TouchableOpacity style={styles.notifBtn} activeOpacity={0.8}>
              <Text style={styles.notifIcon}>🔔</Text>
              <View style={styles.notifDot} />
            </TouchableOpacity>
          </View>

          {/* User Card */}
          {/* <View style={styles.userCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>AH</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Ahmed Hassan</Text>
              <View style={styles.userPosition}>
                <View style={styles.posDot} />
                <Text style={styles.positionText}>Head Chef · Kitchen</Text>
              </View>
            </View>
            <View style={styles.userStats}>
              <View style={styles.stat}>
                <Text style={styles.statVal}>38h</Text>
                <Text style={styles.statLbl}>THIS WEEK</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statVal}>4</Text>
                <Text style={styles.statLbl}>DAYS LEFT</Text>
              </View>
            </View>
          </View> */}
        </View>

        {/* ── Scrollable Body ─────────────────────────────────────────────── */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Today Overview */}
          <Text style={styles.sectionLabel}>Today — Monday, Apr 20</Text>
          <View style={styles.todayCards}>
            <TimeCard
              icon="🍳"
              label="Working Hours"
              value="8h 30m"
              sub="08:00 – 16:30"
              barColor={colors.primary}
            />
            <TimeCard
              icon="☕"
              label="Break Hours"
              value="1h 00m"
              sub="12:00 – 13:00"
              barColor={colors.secondary}
            />
            <TimeCard
              icon="⏱"
              label="Net Hours"
              value="7h 30m"
              sub="Paid time today"
              barColor={colors.primaryDark}
            />
            <TimeCard
              icon="👥"
              label="Department"
              value="Kitchen"
              sub="Team of 6"
              barColor={colors.secondaryLight}
            />
          </View>

          {/* Calendar */}
          <Text style={[styles.sectionLabel, { marginTop: 20 }]}>
            April 2026 Schedule
          </Text>
          <View style={styles.calendarCard}>
            <View style={styles.calHeader}>
              <Text style={styles.calMonth}>April 2026</Text>
              <View style={styles.calNav}>
                <TouchableOpacity style={styles.calNavBtn} activeOpacity={0.7}>
                  <Text style={styles.calNavText}>‹</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.calNavBtn} activeOpacity={0.7}>
                  <Text style={styles.calNavText}>›</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Weekday headers */}
            <View style={styles.calWeekdays}>
              {weekdays.map((wd, i) => (
                <Text key={i} style={styles.calWd}>
                  {wd}
                </Text>
              ))}
            </View>

            {/* Days grid */}
            <View style={styles.calGrid}>
              {calendarCells.map((day, idx) => (
                <CalendarDay
                  key={idx}
                  day={day}
                  isToday={day === TODAY}
                  isOff={day !== null && OFF_DAYS.includes(day)}
                  isWork={day !== null && WORK_DAYS.includes(day)}
                  hasBreak={day !== null && WORK_DAYS.includes(day)}
                  isPast={day !== null && day < TODAY}
                />
              ))}
            </View>

            {/* Legend */}
            <View style={styles.calLegend}>
              {[
                { color: colors.primary, label: 'Today', solid: true },
                { color: colors.primary, label: 'Work', solid: false },
                { color: colors.secondary, label: 'Break', solid: false },
                { color: colors.surface2, label: 'Off', solid: false },
              ].map(({ color, label, solid }) => (
                <View key={label} style={styles.legendItem}>
                  <View
                    style={[
                      styles.legendSwatch,
                      solid
                        ? { backgroundColor: color }
                        : {
                            backgroundColor: color + '33',
                            borderColor: color,
                            borderWidth: 1,
                          },
                    ]}
                  />
                  <Text style={styles.legendLabel}>{label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Timeline */}
          <Text style={[styles.sectionLabel, { marginTop: 20 }]}>
            Today's Schedule
          </Text>
          <View style={styles.timelineContainer}>
            {timelineData.map((item, idx) => (
              <TimelineItem
                key={idx}
                {...item}
                isLast={idx === timelineData.length - 1}
              />
            ))}
          </View>

          <View style={{ height: 16 }} />
        </ScrollView>

        {/* ── Bottom Nav ──────────────────────────────────────────────────── */}
        {/* <View style={styles.bottomNav}>
          {navItems.map(({ key, icon, label }) => {
            const isActive = activeNav === key;
            return (
              <TouchableOpacity
                key={key}
                style={styles.navBtn}
                activeOpacity={0.7}
                onPress={() => setActiveNav(key)}
              >
                <View
                  style={[
                    styles.navIconWrap,
                    isActive && styles.navIconWrapActive,
                  ]}
                >
                  <Text style={styles.navIcon}>{icon}</Text>
                </View>
                <Text
                  style={[styles.navLabel, isActive && styles.navLabelActive]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View> */}
      </View>
    </SafeAreaView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const CAL_CELL = (SCREEN_WIDTH - 32 - 32) / 7; // 16px padding each side + 16px card padding

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.primary },
  root: { flex: 1, backgroundColor: colors.bg },

  // Header
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 16,
    // paddingBottom: 24,
    overflow: 'hidden',
  },
  decCircle1: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  decCircle2: {
    position: 'absolute',
    bottom: -20,
    left: 40,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.07)',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: { fontSize: 13, color: 'rgba(255,255,255,0.8)' },
  headerName: { fontSize: 22, color: '#fff', fontWeight: '600', marginTop: 2 },
  notifBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifIcon: { fontSize: 16 },
  notifDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.secondary,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },

  // User Card
  userCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.primaryDark,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 17, color: '#fff', fontWeight: '600' },
  userInfo: { flex: 1 },
  userName: { fontSize: 15, color: '#fff', fontWeight: '500' },
  userPosition: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 2,
  },
  posDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.secondaryLight,
  },
  positionText: { fontSize: 12, color: 'rgba(255,255,255,0.75)' },
  userStats: { flexDirection: 'row', gap: 16 },
  stat: { alignItems: 'center' },
  statVal: { fontSize: 16, fontWeight: '500', color: '#fff' },
  statLbl: { fontSize: 9, color: 'rgba(255,255,255,0.65)', letterSpacing: 0.5 },

  // Scroll
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 20 },

  // Section label
  sectionLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 10,
  },

  // Today cards
  todayCards: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  timeCard: {
    width: (SCREEN_WIDTH - 32 - 10) / 2,
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: colors.border,
    padding: 14,
  },
  timeCardIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  timeCardIconText: { fontSize: 16 },
  timeCardLabel: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '500',
    marginBottom: 4,
  },
  timeCardValue: { fontSize: 18, fontWeight: '500', color: colors.text },
  timeCardSub: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  accentBar: { height: 3, borderRadius: 2, marginTop: 10 },

  // Calendar
  calendarCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: colors.border,
    padding: 16,
  },
  calHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  calMonth: { fontSize: 17, fontWeight: '500', color: colors.text },
  calNav: { flexDirection: 'row', gap: 6 },
  calNavBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: colors.border,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calNavText: { fontSize: 14, color: colors.textMuted },
  calWeekdays: { flexDirection: 'row', marginBottom: 6 },
  calWd: {
    width: CAL_CELL,
    textAlign: 'center',
    fontSize: 10,
    color: colors.textMuted,
    fontWeight: '500',
    paddingVertical: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  calGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  calDay: {
    width: CAL_CELL,
    height: CAL_CELL,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3,
  },
  calDayEmpty: { width: CAL_CELL, height: CAL_CELL },
  calDayToday: { backgroundColor: colors.primary },
  calDayWork: { backgroundColor: 'rgba(221,153,51,0.1)' },
  calDayPast: { opacity: 0.55 },
  calDayText: { fontSize: 12, color: colors.text },
  calDayTextToday: { color: '#fff', fontWeight: '500' },
  calDayTextOff: { color: colors.textMuted },
  calDots: { flexDirection: 'row', gap: 2, marginTop: 1 },
  calDot: { width: 4, height: 4, borderRadius: 2 },
  dotWork: { backgroundColor: colors.primary },
  dotBreak: { backgroundColor: colors.secondary },
  calLegend: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
    justifyContent: 'center',
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  legendSwatch: { width: 10, height: 10, borderRadius: 3 },
  legendLabel: { fontSize: 11, color: colors.textMuted },

  // Timeline
  timelineContainer: { gap: 8 },
  timelineItem: { flexDirection: 'row', alignItems: 'stretch', gap: 12 },
  tlTime: {
    width: 42,
    textAlign: 'right',
    fontSize: 11,
    color: colors.textMuted,
    paddingTop: 12,
  },
  tlBarWrap: { alignItems: 'center' },
  tlDot: { width: 10, height: 10, borderRadius: 5, marginTop: 14 },
  tlLine: { width: 2, backgroundColor: colors.border, flex: 1, marginTop: 3 },
  tlContent: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.border,
    padding: 10,
    marginBottom: 2,
  },
  tlType: { fontSize: 11, fontWeight: '500', marginBottom: 2 },
  tlDesc: { fontSize: 13, color: colors.text },
  tlDuration: { fontSize: 11, color: colors.textMuted, marginTop: 2 },

  // Bottom Nav
  bottomNav: {
    backgroundColor: colors.surface,
    borderTopWidth: 0.5,
    borderTopColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 20,
  },
  navBtn: {
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  navIconWrap: { padding: 4, borderRadius: 8 },
  navIconWrapActive: { backgroundColor: 'rgba(221,153,51,0.12)' },
  navIcon: { fontSize: 20 },
  navLabel: { fontSize: 10, color: colors.textMuted, fontWeight: '500' },
  navLabelActive: { color: colors.primary },
});

export default HomeScreen;
