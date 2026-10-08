import styles from "./MascotGuide.module.css";

type Props = { celebrating?: boolean; imageSrc?: string; };

export function ChimLacArt({ celebrating = false, imageSrc }: Props) {
  if (imageSrc) {
    return <img className={styles.characterImage} src={imageSrc} alt="Chim Lạc - linh vật hướng dẫn" draggable={false} />;
  }

  return (
    <svg className={styles.art} viewBox="0 0 340 336" aria-label="Chim Lạc, linh vật màu vàng đồng và xanh dương" role="img" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lac-gold" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#FFE6A3"/><stop offset=".48" stopColor="#EFA843"/><stop offset="1" stopColor="#B86722"/></linearGradient>
        <linearGradient id="lac-ivory" x1="0" y1="0" x2=".9" y2="1"><stop stopColor="#FFF9EB"/><stop offset=".65" stopColor="#FFE4B0"/><stop offset="1" stopColor="#F1B46E"/></linearGradient>
        <linearGradient id="lac-blue" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#3FA9F8"/><stop offset=".4" stopColor="#124A89"/><stop offset="1" stopColor="#092448"/></linearGradient>
        <radialGradient id="lac-eye"><stop stopColor="#6E3A12"/><stop offset=".78" stopColor="#291B18"/><stop offset="1" stopColor="#0E1628"/></radialGradient>
        <filter id="lac-soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="5"/></filter>
      </defs>
      <ellipse cx="173" cy="310" rx="93" ry="10" fill="#A77340" opacity=".18" filter="url(#lac-soft)"/>
      <g className={styles.tail}>
        <path d="M139 242 C74 254 52 291 18 304 C81 312 120 291 160 261 Z" fill="url(#lac-blue)" stroke="#E8A04B" strokeWidth="5"/>
        <path d="M153 248 C104 286 76 309 49 317 C109 317 155 297 181 265 Z" fill="url(#lac-gold)" stroke="#9B5A25" strokeWidth="3"/>
        <path d="M133 259 C100 281 77 294 43 300 M144 267 C111 291 87 308 67 312" fill="none" stroke="#FFE29A" strokeWidth="2"/>
      </g>
      <g className={styles.wing}>
        <path d="M132 169 C76 174 35 134 19 83 C48 104 77 106 114 115 Z" fill="url(#lac-gold)" stroke="#B97632" strokeWidth="4"/>
        <path d="M127 187 C72 195 22 166 7 131 C50 150 80 149 120 145 Z" fill="url(#lac-blue)" stroke="#DFA04C" strokeWidth="4"/>
        <path d="M128 203 C76 224 34 216 14 187 C57 196 88 188 118 170 Z" fill="url(#lac-gold)" stroke="#A4622B" strokeWidth="4"/>
        <path d="M124 222 C92 244 54 247 31 231 C71 225 92 206 124 196 Z" fill="#FFF1CC" stroke="#DA9448" strokeWidth="4"/>
        <path d="M27 113 L95 148 M19 153 L91 177 M36 197 L95 202" stroke="#FDE3AE" strokeWidth="2" strokeDasharray="5 6" opacity=".9"/>
        <path d="M125 167 C88 164 74 136 65 122 C108 129 129 146 147 174 Z" fill="url(#lac-ivory)" stroke="#E9AF6B" strokeWidth="3"/>
      </g>
      <g>
        <path d="M147 246 L139 294 M181 248 L192 292" stroke="#A65A25" strokeWidth="10" strokeLinecap="round"/>
        <path d="M139 291 l-15 13 m15-13 l2 17 m0-17 l17 9 M191 289 l-13 16 m13-16 l7 19 m-7-19 l19 8" fill="none" stroke="#A65A25" strokeWidth="7" strokeLinecap="round"/>
        <ellipse cx="169" cy="209" rx="57" ry="72" fill="url(#lac-gold)" stroke="#AB6A2E" strokeWidth="4"/>
        <ellipse cx="166" cy="206" rx="40" ry="57" fill="url(#lac-ivory)"/>
        <circle cx="166" cy="231" r="27" fill="none" stroke="#C9853B" strokeWidth="4"/>
        <circle cx="166" cy="231" r="18" fill="#FFF6DC" stroke="#C9853B" strokeWidth="2"/>
        <path d="M166 214 l5 12 12 2-10 7 2 12-9-6-10 6 3-12-11-7 13-2Z" fill="#C8873A"/>
      </g>
      <g>
        <path d="M96 98 C77 58 80 24 92 15 C105 50 133 55 157 71" fill="url(#lac-gold)" stroke="#B26D2C" strokeWidth="5"/>
        <path d="M118 90 C117 54 136 21 157 17 C152 51 165 68 178 82" fill="url(#lac-blue)" stroke="#DCA253" strokeWidth="5"/>
        <path d="M172 83 C184 43 208 31 226 36 C205 55 205 75 204 94" fill="url(#lac-gold)" stroke="#B26D2C" strokeWidth="5"/>
        <ellipse cx="175" cy="112" rx="83" ry="75" fill="url(#lac-ivory)" stroke="#D58D43" strokeWidth="4"/>
        <path d="M110 105 C116 55 178 43 210 72" stroke="#FFF9EC" strokeWidth="11" fill="none" strokeLinecap="round" opacity=".65"/>
        <ellipse cx="144" cy="123" rx="20" ry="28" fill="#FFFFFF" transform="rotate(-8 144 123)"/>
        <ellipse cx="198" cy="123" rx="20" ry="28" fill="#FFFFFF" transform="rotate(6 198 123)"/>
        <ellipse cx="150" cy="128" rx="12" ry="18" fill="url(#lac-eye)"/>
        <ellipse cx="196" cy="128" rx="12" ry="18" fill="url(#lac-eye)"/>
        <circle cx="154" cy="119" r="4" fill="#FFFFFF"/><circle cx="200" cy="119" r="4" fill="#FFFFFF"/>
        <path d="M127 92 Q141 83 157 91 M181 91 Q197 81 211 92" fill="none" stroke="#C17932" strokeWidth="5" strokeLinecap="round"/>
        <ellipse cx="121" cy="155" rx="14" ry="8" fill="#F39B6E" opacity=".55"/>
        <ellipse cx="216" cy="153" rx="14" ry="8" fill="#F39B6E" opacity=".55"/>
        <path d="M158 150 Q174 172 193 151 Q183 173 170 177 Q158 169 158 150 Z" fill="#7C301C"/>
        <path d="M161 151 Q174 137 193 150 Q181 162 173 160 Z" fill="#FFCB62" stroke="#C4791B" strokeWidth="2"/>
        <path d="M160 165 Q171 160 182 169" stroke="#FF8A5B" strokeWidth="6" strokeLinecap="round"/>
        <path d="M160 83 L172 60 L186 84 L175 79 L171 91 Z" fill="url(#lac-gold)" stroke="#B7772B" strokeWidth="3"/>
      </g>
      <g>
        <path d="M95 64 L176 17 L259 62 L176 93 Z" fill="#092443" stroke="#E7A44A" strokeWidth="5" strokeLinejoin="round"/>
        <path d="M124 70 L125 90 Q174 115 226 91 L226 68" fill="url(#lac-blue)" stroke="#E5A347" strokeWidth="3"/>
        <path d="M256 63 L269 109" stroke="#D2923D" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="269" cy="110" r="5" fill="#E7A84F"/>
        <path d="M269 115 L260 139 L278 139 Z" fill="#1276BF" stroke="#E0A04E" strokeWidth="2"/>
        <path d="M137 90 H215" stroke="#FAD68C" strokeWidth="2" strokeDasharray="5 5"/>
      </g>
      <g>
        <circle cx="97" cy="118" r="18" fill="url(#lac-blue)" stroke="#D79D48" strokeWidth="5"/>
        <path d="M97 108 v20 M87 118 h20" stroke="#99EBFF" strokeWidth="2"/>
        <path d="M110 183 Q150 177 195 194" fill="none" stroke="#0B467D" strokeWidth="12"/>
        <circle cx="191" cy="194" r="20" fill="url(#lac-blue)" stroke="#E4B76C" strokeWidth="5"/>
        <path d="M181 194 l7 7 13-16" fill="none" stroke="#D5F6FF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <g className={styles.smallWing}>
        <path d="M204 195 Q238 177 257 195 Q247 229 209 231" fill="url(#lac-gold)" stroke="#B56C32" strokeWidth="4"/>
        <path d="M213 199 Q243 190 247 201 M214 211 Q237 207 241 216" stroke="#FFE3AB" strokeWidth="3" fill="none"/>
      </g>
      <g transform="translate(217 224) rotate(-12)">
        <path d="M0 0 L47 11 L88 -3 L88 51 L47 65 L0 50 Z" fill="#092D58" stroke="#E7A44C" strokeWidth="5" strokeLinejoin="round"/>
        <path d="M47 11 V65 M8 12 L38 19 M8 23 L38 30 M57 21 L79 13 M57 32 L80 25" fill="none" stroke="#5FD0FF" strokeWidth="2" opacity=".8"/>
        <circle cx="23" cy="34" r="11" fill="none" stroke="#DDA65E" strokeWidth="2"/>
        <path d="M23 26 l2 6 6 2-6 2-2 7-3-7-5-2 6-2Z" fill="#FFD78C"/>
      </g>
      {celebrating && <g className={styles.sparkles}><path d="M44 37 l4 13 13 4-13 4-4 13-4-13-13-4 13-4Z M290 148 l3 9 9 3-9 3-3 9-3-9-9-3 9-3Z" fill="#FFCE60"/></g>}
    </svg>
  );
}
