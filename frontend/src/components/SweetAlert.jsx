import Swal from 'sweetalert2';

export const sweetAlertWarning = ({msg}) => {
    Swal.fire({

        icon:"warning",
        html:msg,
        timer:1500,
        showCancelButton:false,
        showConfirmButton: false, // No OK button
    });
}
export const sweetAlertSuccess = ({msg}) => {
    Swal.fire({

        icon:"success",
        html:msg,
        timer:1500,
        showCancelButton:false,
        showConfirmButton: false, // No OK button

    });
}
export const sweetAlertError = ({msg}) => {
    Swal.fire({

        icon:"error",
        html:msg,
        showCancelButton:true,
        showConfirmButton: false, // No OK button

    });
}


export const confirmDelete = async () => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#3b82f6',
  })

  return result.isConfirmed
}