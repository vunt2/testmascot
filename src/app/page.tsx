"use client";

import { useMemo, useRef, useState } from "react";
import {
  ArrowRight, Bell, BookOpen, CalendarDays, CheckCircle2, ChevronDown,
  CircleHelp, Clock3, Compass, Flame, GraduationCap, LayoutDashboard,
  Lightbulb, Menu, MoreHorizontal, Play, RotateCcw, Search, Sparkles,
  Star, Target, Trophy, Volume2, WandSparkles, X,
} from "lucide-react";
import { ChimLacArt } from "@/components/chim-lac/ChimLacArt";
import { MascotGuide, type MascotGuideHandle, type MascotStep } from "@/components/chim-lac";

const tour: MascotStep[] = [
  {
    target: "#guide-start",
    title: "Bắt đầu hành trình nào!",
    description: "Nhấn vào đây để mở bài học tiếp theo. Mình sẽ luôn ở bên khi bạn cần một chút chỉ dẫn.",
  },
  {
    target: "#guide-plan",
    title: "Lộ trình dành riêng cho bạn",
    description: "Mỗi chặng học được chia nhỏ để bạn dễ theo dõi. Cứ hoàn thành từng bước là được nhé!",
  },
  {
    target: "#guide-lessons",
    title: "Chọn môn bạn thích",
    description: "Những thẻ khóa học ngay bên dưới có thể bấm được. Bạn có thể chọn một bài và tiếp tục học.",
  },
  {
    target: "#guide-achievements",
    title: "Đừng quên nhìn lại tiến bộ!",
    description: "Mỗi hoạt động nhỏ đều đáng ghi nhận. Ở đây bạn có thể xem số bài đã hoàn thành và thành tích của mình.",
  },
];

const lessons = [
  { id: "math", label: "TOÁN HỌC", title: "Hàm số & đồ thị", description: "Khám phá thế giới những đường cong thú vị", theme: "blue", icon: "∑", level: "Lớp 10", percent: 68, category: "Tự nhiên" },
  { id: "english", label: "TIẾNG ANH", title: "The Art of Speaking", description: "Tự tin nói tiếng Anh mỗi ngày", theme: "peach", icon: "Aa", level: "B1 Intermediate", percent: 42, category: "Ngoại ngữ" },
  { id: "literature", label: "NGỮ VĂN", title: "Sắc màu văn học", description: "Đọc, cảm nhận và kể câu chuyện của bạn", theme: "lavender", icon: "✦", level: "Lớp 10", percent: 86, category: "Xã hội" },
];

const tasks = [
  { id: "review", title: "Ôn tập 15 từ vựng", subject: "Tiếng Anh", time: "10 phút", tone: "orange" },
  { id: "practice", title: "Làm bài tập hàm số", subject: "Toán học", time: "20 phút", tone: "blue" },
  { id: "read", title: "Đọc một đoạn văn hay", subject: "Ngữ văn", time: "15 phút", tone: "purple" },
];

export default function Home() {
  const mascotRef = useRef<MascotGuideHandle>(null);
  const [mascotVisible, setMascotVisible] = useState(true);
  const [category, setCategory] = useState("Tất cả");
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({ review: true });
  const [toast, setToast] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const checkedCount = tasks.filter((task) => completedTasks[task.id]).length;
  const visibleLessons = useMemo(
    () => category === "Tất cả" ? lessons : lessons.filter((lesson) => lesson.category === category),
    [category],
  );

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3200);
  };

  const toggleMascot = () => {
    if (mascotVisible) mascotRef.current?.hide();
    else mascotRef.current?.show();
    setMascotVisible((value) => !value);
  };

  return (
    <div className="appShell">
      <aside className={"sidebar " + (menuOpen ? "sidebarOpen" : "")}>
        <div className="brand"><div className="brandMark"><Sparkles size={22} /></div><div><strong>Lạc Học<span>.</span></strong><small>LEARN WITH WONDER</small></div></div>
        <div className="workspaceLabel">KHÔNG GIAN HỌC TẬP</div>
        <nav aria-label="Điều hướng chính" className="navList">
          <a className="navActive" href="#top" onClick={() => setMenuOpen(false)}><LayoutDashboard size={18}/> Tổng quan</a>
          <a href="#courses" onClick={() => setMenuOpen(false)}><BookOpen size={18}/> Khóa học của tôi <span className="navCount">3</span></a>
          <a href="#roadmap" onClick={() => setMenuOpen(false)}><Compass size={18}/> Lộ trình học</a>
          <a href="#activities" onClick={() => setMenuOpen(false)}><CalendarDays size={18}/> Kế hoạch hôm nay</a>
          <a href="#achievements" onClick={() => setMenuOpen(false)}><Trophy size={18}/> Thành tích</a>
        </nav>
        <div className="workspaceLabel secondLabel">HỖ TRỢ</div>
        <nav className="navList" aria-label="Trợ giúp">
          <button onClick={() => { mascotRef.current?.startTour(); setMascotVisible(true); setMenuOpen(false); }}><CircleHelp size={18}/> Hướng dẫn sử dụng</button>
          <button onClick={() => showToast("Đây là trang demo, tính năng cài đặt sẽ được bổ sung sau.")}><Volume2 size={18}/> Cài đặt học tập</button>
        </nav>
        <div className="sidebarBottom">
          <div className="tinyStar"><Star size={15} fill="currentColor"/></div>
          <strong>Mỗi ngày một bước nhỏ.</strong>
          <p>Học theo cách của bạn, tiến xa theo nhịp của bạn.</p>
          <span>✦ KIÊN TRÌ TẠO NÊN KHÁC BIỆT</span>
        </div>
        <div className="sidebarProfile"><div className="userAvatar">H</div><div><strong>Học viên nhỏ</strong><small>Nhà khám phá cấp 3</small></div><MoreHorizontal size={18}/></div>
      </aside>

      {menuOpen && <button className="mobileBackdrop" aria-label="Đóng menu" onClick={() => setMenuOpen(false)} />}

      <div className="mainPanel" id="top">
        <header className="topbar">
          <div className="headerTitle"><button className="mobileMenu" onClick={() => setMenuOpen(true)} aria-label="Mở menu"><Menu size={21}/></button><span>Không gian của bạn</span><span className="headerChevron">/</span><strong>Tổng quan</strong></div>
          <div className="topActions">
            <span className="demoBadge"><span/> DEMO MODE</span>
            <button className="iconTop" aria-label="Tìm kiếm" onClick={() => showToast("Tính năng tìm kiếm đang được minh họa trong bản demo.")}><Search size={19}/></button>
            <button className="iconTop notification" aria-label="Thông báo" onClick={() => showToast("Bạn không có thông báo mới.")}><Bell size={19}/><i/></button>
            <div className="topAvatar">H</div>
          </div>
        </header>

        <main className="content">
          <div className="welcomeRow">
            <div><span className="overline">THỨ NĂM • NGÀY HỌC MỚI <span className="tinySun">✳</span></span><h1>Chào bạn, nhà khám phá! <span>✦</span></h1><p>Hôm nay, mình cùng học thêm điều gì hay ho nhé?</p></div>
            <button className="outlineButton mascotToggle" onClick={toggleMascot}>{mascotVisible ? <X size={15}/> : <Sparkles size={15}/>} {mascotVisible ? "Ẩn Chim Lạc" : "Hiện Chim Lạc"}</button>
          </div>

          <section className="heroCard" aria-label="Khám phá Chim Lạc">
            <div className="heroGrid" />
            <div className="heroSpark heroSparkA">✦</div><div className="heroSpark heroSparkB">✧</div><div className="heroSpark heroSparkC">✦</div>
            <div className="heroText">
              <div className="heroPill"><span className="heroPillDot"/> CÓ MÌNH ĐỒNG HÀNH</div>
              <h2>Học điều mới,<br/><em>mở cả chân trời.</em></h2>
              <p>Mỗi câu hỏi là một cơ hội khám phá. Cùng Chim Lạc biến hành trình học tập thành một chuyến phiêu lưu thú vị!</p>
              <div className="heroButtons"><button id="guide-start" className="goldButton" onClick={() => { mascotRef.current?.showStep(1); setMascotVisible(true); }}>Bắt đầu khám phá <ArrowRight size={17}/></button><button className="heroTextButton" onClick={() => { mascotRef.current?.startTour(); setMascotVisible(true); }}><Play size={14} fill="currentColor"/> Xem hướng dẫn</button></div>
            </div>
            <div className="heroBird" aria-hidden="true"><div className="birdHalo"/><ChimLacArt/></div>
            <div className="heroCornerDecor">✦ LẠC HỌC 2026</div>
          </section>

          <section className="statsRow" aria-label="Tổng quan kết quả học tập">
            <article className="statCard"><div className="statIcon iconGold"><Flame size={22}/></div><div><span>Chuỗi ngày học</span><div className="statValue">07 <small>ngày</small></div><p><b>↗</b> Duy trì thật tuyệt!</p></div><div className="statOrnament">✹</div></article>
            <article className="statCard"><div className="statIcon iconBlue"><BookOpen size={21}/></div><div><span>Bài học hoàn thành</span><div className="statValue">24 <small>bài</small></div><p>Tiếp tục giữ nhịp nhé</p></div><div className="statOrnament">◈</div></article>
            <article className="statCard"><div className="statIcon iconPurple"><Trophy size={21}/></div><div><span>Điểm kinh nghiệm</span><div className="statValue">1,280 <small>XP</small></div><p><b>+120 XP</b> trong tuần này</p></div><div className="statOrnament">✳</div></article>
          </section>

          <div className="contentGrid">
            <div className="primaryColumn">
              <section className="section" id="courses">
                <div className="sectionHeader"><div><div className="sectionEyebrow">TIẾP TỤC HÀNH TRÌNH</div><h2>Khóa học của mình <span>✦</span></h2></div><button className="textLink" onClick={() => showToast("Bạn đang xem tất cả khóa học demo.")}>Xem tất cả <ArrowRight size={16}/></button></div>
                <div id="guide-lessons" className="filterBar" role="group" aria-label="Lọc khóa học">{["Tất cả","Tự nhiên","Ngoại ngữ","Xã hội"].map((item) => <button key={item} onClick={() => setCategory(item)} className={category === item ? "filterActive" : ""}>{item}</button>)}</div>
                <div className="courseGrid">
                  {visibleLessons.map((lesson) => (
                    <article className={"courseCard course-" + lesson.theme} key={lesson.id}>
                      <div className="courseVisual"><span className="visualBlob"/><span className="visualMark">{lesson.icon}</span><span className="visualOrb visualOrbOne"/><span className="visualOrb visualOrbTwo"/><span className="courseLevel">{lesson.level}</span></div>
                      <div className="courseInfo"><span className="courseLabel">{lesson.label}</span><h3>{lesson.title}</h3><p>{lesson.description}</p>
                        <div className="courseProgressMeta"><span>Tiến độ học tập</span><strong>{lesson.percent}%</strong></div><div className="progressTrack"><div style={{width: lesson.percent + "%"}} /></div>
                        <button onClick={() => { showToast("Đã mở bản minh họa bài học: " + lesson.title); mascotRef.current?.showStep(3); setMascotVisible(true); }}>Tiếp tục học <ArrowRight size={15}/></button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="section roadmapSection" id="roadmap">
                <div className="sectionHeader"><div><div className="sectionEyebrow">TỪNG BƯỚC TIẾN XA</div><h2>Lộ trình tuần này</h2></div><div className="weekLabel"><CalendarDays size={14}/> Tuần 2 / Tháng 10 <ChevronDown size={14}/></div></div>
                <div id="guide-plan" className="roadmapCard">
                  <div className="roadmapTop"><div><span className="roadmapKicker">MỤC TIÊU TUẦN</span><h3>Tiến thêm một chút mỗi ngày</h3><p>Hoàn thành 4/5 buổi học để nhận huy hiệu mới.</p></div><div className="roundMeter"><div className="roundMeterInner"><strong>80%</strong><small>HOÀN THÀNH</small></div></div></div>
                  <div className="weekdayStrip">{["T2","T3","T4","T5","T6","T7","CN"].map((day,index) => <div className="weekday" key={day}><div className={"weekdayCircle " + (index < 4 ? "weekdayDone" : index === 4 ? "weekdayToday" : "")}>{index < 4 ? <CheckCircle2 size={17}/> : index + 6}</div><span>{day}</span></div>)}</div>
                </div>
              </section>
            </div>

            <div className="sideColumn">
              <section className="section" id="activities"><div className="sectionHeader compactHeader"><div><div className="sectionEyebrow">CHẬM MÀ CHẮC</div><h2>Việc hôm nay</h2></div><MoreHorizontal size={20} color="#8495A7"/></div>
                <div className="todoCard"><div className="todoIntro"><span>ĐÃ HOÀN THÀNH</span><strong>{checkedCount}/{tasks.length}</strong></div><div className="todoMeter"><div style={{width: (checkedCount/tasks.length*100) + "%"}}/></div>
                  {tasks.map((task) => <label key={task.id} className={"todoRow " + (completedTasks[task.id] ? "todoChecked" : "")}><input type="checkbox" checked={!!completedTasks[task.id]} onChange={(event) => { setCompletedTasks((prev) => ({...prev, [task.id]:event.target.checked})); if(event.target.checked) showToast("Giỏi quá! Bạn vừa hoàn thành: " + task.title); }}/><span className={"todoIcon todo-" + task.tone}>{task.tone === "orange" ? <BookOpen size={17}/> : task.tone === "blue" ? <Target size={17}/> : <Lightbulb size={17}/>}</span><span className="todoCopy"><strong>{task.title}</strong><small>{task.subject} · {task.time}</small></span><CheckCircle2 className="todoCheck" size={16}/></label>)}
                </div>
              </section>

              <section id="achievements" className="section"><div className="sectionHeader compactHeader"><div><div className="sectionEyebrow">THÀNH QUẢ XỨNG ĐÁNG</div><h2>Góc thành tích</h2></div><Star size={19} color="#D89A3D"/></div>
                <div className="achievementCard" id="guide-achievements"><div className="medalGlow"/><div className="medal"><Trophy size={30} fill="#F5D28A" color="#A66D27"/></div><span className="achievementTag">HUY HIỆU MỚI</span><h3>Nhà thám hiểm chăm chỉ</h3><p>Chăm chỉ học 7 ngày liên tiếp. Bạn đã làm rất tốt!</p><button onClick={() => { mascotRef.current?.showStep(3); setMascotVisible(true); }}>Cùng Chim Lạc ăn mừng <Sparkles size={15}/></button></div>
              </section>
              <section className="tipCard"><div className="tipIcon"><Lightbulb size={21}/></div><div><strong>Một mẹo nhỏ nè!</strong><p>Nghỉ 5 phút sau mỗi 25 phút học sẽ giúp bạn tập trung hơn.</p></div></section>
            </div>
          </div>

          <footer className="footer"><span>✦ Lạc Học — Demo giao diện giáo dục</span><span>Made for curious minds · 2026</span><button onClick={() => { mascotRef.current?.resetProgress(); setMascotVisible(true); }}><RotateCcw size={13}/> Xem lại tour</button></footer>
        </main>
      </div>

      <MascotGuide ref={mascotRef} steps={tour} imageSrc={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/mascot/chim-lac.webp`} storageKey="lac-hoc-demo-tour-v1" onComplete={() => showToast("Bạn đã khám phá xong trang demo! 🎉")} />
      {toast && <div className="toast" role="status"><CheckCircle2 size={18}/>{toast}<button aria-label="Đóng thông báo" onClick={() => setToast("")}><X size={15}/></button></div>}
    </div>
  );
}
