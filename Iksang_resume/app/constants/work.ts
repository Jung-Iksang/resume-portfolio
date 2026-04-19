import * as THREE from "three";
import { WorkTimelinePoint } from "../types";

export const WORK_TIMELINE: WorkTimelinePoint[] = [
  {
    point: new THREE.Vector3(0, 0, 0),
    year: '2021',
    title: 'Started CS',
    subtitle: 'Computer Science',
    details: [
      'SW창업 아이디어 경진대회 최우수상',
      'Start-App 캠프&경진대회 우수상',
      'AI아카데미 대상',
    ],
    position: 'right',
  },
  {
    point: new THREE.Vector3(-4, -3, -3),
    year: '2022',
    title: 'Military Service',
    subtitle: 'ROK Army',
    details: [
      '군복무 (22.01.10~23.07.09)',
    ],
    position: 'left',
  },
  {
    point: new THREE.Vector3(-2, -1, -6),
    year: '2024',
    title: 'Awards',
    subtitle: 'Competitions',
    details: [
      '스마트모빌리티 아이디어 경진대회 우수상',
      '전국 대학교 자율주행 경진대회 주행 5등',
      '이노브릿지 아이디어 해커톤 사업단장상',
    ],
    position: 'left',
  },
  {
    point: new THREE.Vector3(1, -2, -9),
    year: '2024',
    title: 'Research & Projects',
    subtitle: 'Lab & Publications',
    details: [
      '대학교 책쓰기 프로젝트 (책 출간)',
      '창의대첩 장려상',
      'SW융합 하드웨어 실험실 (학부연구생)',
      '국가산학과제',
    ],
    position: 'right',
  },
  {
    point: new THREE.Vector3(-3, 0, -12),
    year: '2025',
    title: 'Achievements',
    subtitle: 'Hackathons & Capstone',
    details: [
      '한국프로젝트경영학회 공동학술대회 논문발표 및 우수논문상 수상',
      'Do-dream 해커톤 최우수상',
      '캡스톤디자인 대상',
    ],
    position: 'left',
  },
  {
    point: new THREE.Vector3(1, 1, -15),
    year: new Date().toLocaleDateString('default', { year: 'numeric' }),
    title: 'Present',
    subtitle: 'Building Portfolio',
    position: 'right',
  },
]