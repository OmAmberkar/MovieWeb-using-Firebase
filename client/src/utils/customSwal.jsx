import Swal from "sweetalert2";

// 🟢 Success Swal
export const successSwal = Swal.mixin({
  background: "#0f172a", // slate-900
  color: "#a7f3d0",       // emerald-200
  iconColor: "#10b981",   // emerald-500
  showConfirmButton: false, // 🚫 hide "OK" button
  timer: 2000,             // ⏳ auto-dismiss after 2 seconds
  timerProgressBar: true,
  showClass: {
    popup: 'animate__animated animate__fadeInDown',
  },
  hideClass: {
    popup: 'animate__animated animate__fadeOutUp',
  },
  customClass: {
    popup: 'rounded-xl shadow-lg border border-green-500',
    title: 'text-emerald-400 font-bold text-lg',
  },
});


// 🟡 Warning Swal
export const warningSwal = Swal.mixin({
  background: "#1e293b",  // slate-800
  color: "#fde68a",       // amber-200
  iconColor: "#facc15",   // amber-400
  confirmButtonColor: "#f59e0b", // amber-500
  showClass: {
    popup: 'animate__animated animate__zoomIn',
  },
  hideClass: {
    popup: 'animate__animated animate__zoomOut',
  },
  customClass: {
    popup: 'rounded-xl shadow-lg border border-yellow-400',
    title: 'text-amber-400 font-bold text-lg',
    confirmButton: 'bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition duration-200',
  },
});

// 🔴 Error Swal
export const errorSwal = Swal.mixin({
  background: "#1f1f2e", // deep dark
  color: "#fecaca",       // rose-200
  iconColor: "#f87171",   // red-400
  confirmButtonColor: "#ef4444", // red-500
  showClass: {
    popup: 'animate__animated animate__shakeX',
  },
  hideClass: {
    popup: 'animate__animated animate__fadeOutDown',
  },
  customClass: {
    popup: 'rounded-xl shadow-lg border border-red-500',
    title: 'text-red-400 font-bold text-lg',
    confirmButton: 'bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200',
  },
});

// 🔵 Info Swal
export const infoSwal = Swal.mixin({
  background: "#0f172a", // slate-900
  color: "#93c5fd",       // blue-300
  iconColor: "#3b82f6",   // blue-500
  confirmButtonColor: "#2563eb", // blue-600
  showClass: {
    popup: 'animate__animated animate__fadeIn',
  },
  hideClass: {
    popup: 'animate__animated animate__fadeOut',
  },
  customClass: {
    popup: 'rounded-xl shadow-lg border border-blue-500',
    title: 'text-blue-400 font-bold text-lg',
    confirmButton: 'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200',
  },
});
