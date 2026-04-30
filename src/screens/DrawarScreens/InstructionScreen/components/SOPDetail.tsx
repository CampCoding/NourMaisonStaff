import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SOPItem } from '../types';
import RoleTag from '../components/RoleTag';
import { Colors, hp, wp } from '../../../../constants';
import SubHeader from '../../../../component/SubHeader';
import AddNoteModal from './AddNoteModal';

interface Props {
  item: SOPItem;
}

const SOPDetail: React.FC<Props> = ({ item }) => {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <View style={styles.detailContainer}>
      <SubHeader title={item.title} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.detailScroll}
      >
        <View style={styles.detailRoleRow}>
          {item.roles
            .filter(r => r !== 'all')
            .map(r => (
              <RoleTag key={r} roleKey={r} />
            ))}
          {item.roles.includes('all') && (
            <View
              style={[
                styles.roleTag,
                { backgroundColor: Colors.primary + '18' },
              ]}
            >
              <Text style={[styles.roleTagText, { color: Colors.primaryDark }]}>
                👥 All Staff
              </Text>
            </View>
          )}
        </View>

        <View style={styles.stepsSection}>
          {item.steps.map((step, idx) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setVisible(true);
                }}
                key={step.id}
                style={[styles.stepRow]}
              >
                <View style={styles.stepLeft}>
                  <View style={[styles.stepNumberWrap]}>
                    <Text style={styles.stepNumber}>{idx + 1}</Text>
                  </View>
                  {idx < item.steps.length - 1 && (
                    <View style={[styles.stepConnector]} />
                  )}
                </View>
                <View style={styles.stepContent}>
                  <Text style={[styles.stepText]}>{step.text}</Text>
                  {step.note && (
                    <View style={styles.stepNote}>
                      <Text style={styles.stepNoteText}>{step.note}</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <AddNoteModal
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
        />
        {item.tips && (
          <View style={styles.tipsCard}>
            <Text style={styles.tipsIcon}>💡</Text>
            <View style={styles.tipsContent}>
              <Text style={styles.tipsTitle}>Pro Tip</Text>
              <Text style={styles.tipsText}>{item.tips}</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  detailContainer: { flex: 1, backgroundColor: Colors.bg },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(5), // 20px
    paddingVertical: hp(1.75), // 14px
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.bg,
    gap: wp(3), // 12px
  },
  backBtn: {
    width: wp(9.5), // 38px
    height: wp(9.5), // 38px
    borderRadius: wp(3), // 12px
    backgroundColor: Colors.surface2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: wp(4.5), // 18px
    color: Colors.text,
    fontWeight: '600',
  },
  headerCenter: {
    flex: 1,
    marginLeft: wp(3.5), // 14px
  },
  headerTitle: {
    fontSize: wp(4.5), // 18px
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.3,
  },
  detailScroll: {
    padding: wp(5), // 20px
    paddingBottom: hp(6), // 48px
  },
  detailRoleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp(2), // 8px
    marginBottom: hp(2.5), // 20px
  },
  roleTag: {
    paddingHorizontal: wp(2.25), // 9px
    paddingVertical: hp(0.375), // 3px
    borderRadius: wp(2), // 8px
  },
  roleTagText: {
    fontSize: wp(2.75), // 11px
    fontWeight: '600',
  },
  stepsSection: { marginBottom: hp(2.5) }, // 20px
  stepRow: {
    flexDirection: 'row',
    gap: wp(3.5), // 14px
    minHeight: hp(6.5), // 52px
  },
  stepLeft: {
    alignItems: 'center',
    width: wp(7), // 28px
  },
  stepNumberWrap: {
    width: wp(7), // 28px
    height: wp(7), // 28px
    borderRadius: wp(3.5), // 14px
    backgroundColor: Colors.surface2,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumber: {
    fontSize: wp(3), // 12px
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  stepConnector: {
    flex: 1,
    width: 2,
    backgroundColor: Colors.border,
    marginTop: hp(0.5), // 4px
    marginBottom: hp(-0.5), // -4px
  },
  stepContent: {
    flex: 1,
    paddingBottom: hp(2), // 16px
    paddingTop: hp(0.5), // 4px
  },
  stepText: {
    fontSize: wp(3.5), // 14px
    color: Colors.text,
    lineHeight: hp(2.75), // 22px
    fontWeight: '500',
  },
  stepNote: {
    marginTop: hp(0.75), // 6px
    backgroundColor: '#fff8ec',
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
    borderRadius: wp(1.5), // 6px
    padding: wp(2), // 8px
  },
  stepNoteText: {
    fontSize: wp(3), // 12px
    color: Colors.primaryDark,
    fontWeight: '500',
    lineHeight: hp(2.25), // 18px
  },
  tipsCard: {
    flexDirection: 'row',
    gap: wp(3), // 12px
    backgroundColor: Colors.surface2,
    borderRadius: wp(3.5), // 14px
    padding: wp(4), // 16px
    marginBottom: hp(3), // 24px
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'flex-start',
  },
  tipsIcon: { fontSize: wp(5), marginTop: hp(0.125) }, // 20px, 1px
  tipsContent: { flex: 1 },
  tipsTitle: {
    fontSize: wp(3.25), // 13px
    fontWeight: '700',
    color: Colors.primaryDark,
    marginBottom: hp(0.5), // 4px
  },
  tipsText: {
    fontSize: wp(3.25), // 13px
    color: Colors.textMuted,
    lineHeight: hp(2.5), // 20px
  },
});

export default SOPDetail;
