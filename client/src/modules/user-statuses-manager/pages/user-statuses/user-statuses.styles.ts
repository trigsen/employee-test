export const styles = {
  container: {
    padding: '0px 24px'
  },
  statusesContainer: {
    paddingTop: '80px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr));',
    justifyItems: 'center',
    gap: '40px'
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center'
  }
} as const
